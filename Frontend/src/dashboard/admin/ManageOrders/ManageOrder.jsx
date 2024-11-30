import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from "../../../redux/features/order/orderApi";
import { formatDate } from "../../../utils/dataFormer";
import UpdateOrderModal from "./UpdateOrder";

const ManageOrders = () => {
  const { data: orders = [], error, isLoading, refetch } = useGetAllOrdersQuery();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteOrder] = useDeleteOrderMutation();

  // Open modal with selected order
  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // Delete an order
  const handleDeleteClick = async (orderId) => {
    try {
      await deleteOrder(orderId).unwrap();
      refetch(); // Refetch orders after deletion
    } catch (err) {
      console.error("Failed to delete order:", err);
    }
  };

  // Loading and error states
  if (isLoading) return <div>Loading orders...</div>;
  if (error) return <div>Error: Unable to fetch orders.</div>;

  return (
    <div className="section__container p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Orders</h2>

      {/* Orders Table */}
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b">Order ID</th>
            <th className="py-3 px-4 border-b">Customer</th>
            <th className="py-3 px-4 border-b">Status</th>
            <th className="py-3 px-4 border-b">Date</th>
            <th className="py-3 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b">{order._id}</td>
              <td className="py-3 px-4 border-b">{order?.email}</td>
              <td className="py-3 px-4 border-b">
                <span
                  className={`inline-block px-3 py-1 text-xs text-white rounded-full ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </td>
              <td className="py-3 px-4 border-b">
                {formatDate(order?.updatedAt)}
              </td>
              <td className="py-3 px-4 border-b flex items-center space-x-4">
                <Link
                  to={`/dashboard/orders/${order._id}`}
                  className="text-blue-500 hover:underline"
                >
                  View
                </Link>
                <button
                  onClick={() => handleEditClick(order)}
                  className="text-green-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(order?._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Order Modal */}
      {selectedOrder && (
        <UpdateOrderModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onUpdated={() => refetch()} // Refetch after update
        />
      )}
    </div>
  );
};

// Helper function to get status color
const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500";
    case "processing":
      return "bg-blue-500";
    case "shipped":
      return "bg-green-500";
    case "completed":
      return "bg-gray-500";
    default:
      return "bg-gray-300";
  }
};

export default ManageOrders;
