import React from "react";
import { useNavigate } from "react-router-dom";

const CODSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Order Placed Successfully</h1>
      <p className="text-lg mb-6">Your order has been placed and will be processed soon.</p>
      <p className="text-gray-600 mb-6">
        You can pay in cash when your order is delivered. Thank you for shopping with us!
      </p>
      <button
        onClick={() => navigate("/orders")}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        View My Orders
      </button>
    </div>
  );
};

export default CODSuccess;
