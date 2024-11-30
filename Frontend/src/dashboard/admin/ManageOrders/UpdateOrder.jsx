import React, { useState } from "react";
import { useUpdateOrderStatusMutation } from "./../../../redux/features/order/orderApi";

const UpdateOrderModal = ({ order, onClose, isOpen, onUpdated }) => {
  if (!isOpen || !order) return null; // Avoid rendering if modal is not open or order is missing

  const [status, setStatus] = useState(order.status);
  const [updateOrderStatus, { isLoading, error }] = useUpdateOrderStatusMutation();

  const handleUpdate = async () => {
    if (window.confirm("Are you sure you want to update the order status?")) {
      try {
        await updateOrderStatus({ id: order._id, status }).unwrap();
        onUpdated(); // Trigger a refresh after updating
        onClose(); // Close the modal
      } catch (err) {
        console.error("Failed to update order status:", err);
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 id="modal-title" className="text-xl font-semibold mb-4">
          Update Order Status
        </h2>
        <p id="modal-description" className="mb-4">
          Please select a new status for the order.
        </p>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            disabled={isLoading}
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {error && (
          <p className="text-red-500 mb-4">
            {error.data?.message || "Failed to update status. Please try again."}
          </p>
        )}

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrderModal;
