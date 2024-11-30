import React from "react";
import { useSelector } from "react-redux";
import { useGetOrdersByEmailQuery } from "./../../redux/features/order/orderApi";
import { Link } from "react-router-dom";

const UserOrders = () => {
    const { user } = useSelector((state) => state.auth);
    console.log("User Email:", user?.email); // Debugging email
    const { data: orders, error, isLoading } = useGetOrdersByEmailQuery(user?.email);
  
    if (!user?.email) {
      return (
        <div className="text-center py-6 text-red-600">
          User not logged in or email missing. Please log in to view orders.
        </div>
      );
    }
  
    if (isLoading) return <div className="text-center py-6">Loading orders...</div>;
    if (error) return <div className="text-center py-6 text-red-600">Failed to load orders.</div>;
  
    if (!orders || orders.length === 0) {
      return (
        <div className="text-center py-6 text-gray-600">
          No orders found. Start shopping to place your first order!
        </div>
      );
    }
  return (
    <section className="py-6 bg-blueGray-50">
      <div className="container mx-auto px-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t px-4 py-3 border-b border-solid border-blueGray-200">
            <h3 className="font-semibold text-lg text-blueGray-700">Your Orders</h3>
          </div>
          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    #
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Order ID
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Date
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Status
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Total
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id} className="hover:bg-blueGray-100">
                    <td className="border-t-0 px-6 align-middle text-xs whitespace-nowrap p-4">
                      {index + 1}
                    </td>
                    <td className="border-t-0 px-6 align-middle text-xs whitespace-nowrap p-4 text-blueGray-700">
                      {order._id}
                    </td>
                    <td className="border-t-0 px-6 align-middle text-xs whitespace-nowrap p-4">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="border-t-0 px-6 align-middle text-xs whitespace-nowrap p-4">
                      <span
                        className={`px-2 py-1 rounded ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : order.status === "pending"
                            ? "bg-red-100 text-red-700"
                            : order.status === "processing"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-indigo-100 text-indigo-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="border-t-0 px-6 align-middle text-xs whitespace-nowrap p-4">
                      ₹{order.amount.toFixed(2)}
                    </td>
                    <td className="border-t-0 px-6 align-middle text-xs whitespace-nowrap p-4">
                      <Link
                        to={`/orders/${order._id}`}
                        className="text-indigo-500 hover:text-indigo-700"
                      >
                        View Order
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserOrders;
