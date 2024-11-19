// components/CartModal.jsx
import React from "react";
import OrderSummary from "./OrderSummary";
import {
  useRemoveItemFromCartMutation,
  useUpdateCartItemMutation,
  useFetchCartQuery,
} from '../../redux/features/cart/cartApi';
import { getBaseUrl } from "../../../../Frontend/src/utils/baseURL";

const CartModal = ({ isOpen, onClose, userId }) => {

  const { data: products = [], isLoading } = useFetchCartQuery(userId);

  const [removeItemFromCart] = useRemoveItemFromCartMutation();
  const [updateCartItem] = useUpdateCartItemMutation();

  const handleQuantity = async (type, id) => {
    await updateCartItem({ id, type });
  };

  const handleRemove = async (e, id) => {
    e.preventDefault();
    await removeItemFromCart(id);
  };

  return (
    <div
      className={`fixed z-[1000] inset-0 bg-black bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ transition: "opacity 300ms" }}
    >
      <div
        className={`fixed right-0 top-0 md:w-1/3 w-full bg-white h-full overflow-y-auto transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          transition: "transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <div className="p-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-semibold">Your Cart</h4>
            <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
              <i className="ri-xrp-fill bg-black p-1 text-white"></i>
            </button>
          </div>
          {isLoading ? (
            <p>Loading...</p>
          ) : products.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            products.map((item) => (
              <div key={item._id} className="flex items-center justify-between shadow-md p-5 mb-4">
                <div className="flex items-center">
                  <img
                    src={
                      item.image
                        ? item.image.startsWith("http")
                          ? item.image
                          : `${getBaseUrl()}${item.image}`
                        : "/path/to/placeholder.jpg" // Fallback to placeholder image
                    }
                    alt={item.name || "Product image"}
                    className="size-12 object-cover mr-4"
                  />
                  <div>
                    <h5 className="text-lg font-medium">{item.name}</h5>
                    <p className="text-gray-600 text-sm">Rs {Number(item.price).toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button onClick={() => handleQuantity("decrement", item._id)} className="px-2">-</button>
                  <span className="px-4">{item.quantity}</span>
                  <button onClick={() => handleQuantity("increment", item._id)} className="px-2">+</button>
                  <button onClick={(e) => handleRemove(e, item._id)} className="text-red-500 hover:text-red-700 ml-4">
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        {products.length > 0 && <OrderSummary products={products} />}

        </div>
      </div>
    </div>
  );
};

export default CartModal;
