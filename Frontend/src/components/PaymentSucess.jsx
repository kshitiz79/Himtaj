import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBaseUrl } from "../utils/baseURL";

const PaymentSuccess = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get("session_id");

    if (sessionId) {
      fetch(`${getBaseUrl()}/api/orders/confirm-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id: sessionId }),
      })
        .then((res) => res.json())
        .then((data) => setOrder(data.order))
        .catch((error) => console.error("Error confirming payment:", error));
    }
  }, []);

  if (!order) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Successful</h1>
      <p className="text-lg mb-2">Order ID: {order.orderId}</p>
      <p className="text-lg mb-6">Thank you for your payment!</p>
      <button
        onClick={() => navigate("/orders")}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        View My Orders
      </button>
    </div>
  );
};

export default PaymentSuccess;
