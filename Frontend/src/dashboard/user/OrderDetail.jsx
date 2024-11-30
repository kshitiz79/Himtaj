import React from "react";
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../../src/redux/features/order/orderApi";
import TimelineStep from "./TimelineSteps";

const OrderDetails = () => {
  const { orderId } = useParams(); // Get order ID from URL

  // Check if orderId exists before making the API call
  if (!orderId || orderId === "undefined") {
    return (
      <div className="text-center py-6 text-red-600">
        Invalid order ID. Please check the URL and try again.
      </div>
    );
  }

  const { data: order, error, isLoading } = useGetOrderByIdQuery(orderId); // Fetch order data

  if (isLoading) {
    return <div className="text-center py-6">Loading order details...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-6 text-red-600">
        Error: {error?.data?.message || "Something went wrong while fetching the order."}
      </div>
    );
  }

  if (!order || Object.keys(order).length === 0) {
    return (
      <div className="text-center py-6 text-gray-600">
        No order found. Please check the order ID and try again.
      </div>
    );
  }

  // Helper functions for timeline logic
  const isCompleted = (status) => {
    const statuses = ["pending", "processing", "shipped", "completed"];
    return statuses.indexOf(status) < statuses.indexOf(order.status);
  };

  const isCurrent = (status) => order.status === status;

  const steps = [
    {
      status: "pending",
      label: "Pending",
      description: "Your order has been created and is awaiting processing.",
      icon: { iconName: "edit-2-line", bgColor: "red-500", textColor: "gray-800" },
    },
    {
      status: "processing",
      label: "Processing",
      description: "Your order is currently being processed.",
      icon: { iconName: "loader-line", bgColor: "yellow-500", textColor: "yellow-800" },
    },
    {
      status: "shipped",
      label: "Shipped",
      description: "Your order has been shipped.",
      icon: { iconName: "truck-line", bgColor: "blue-800", textColor: "blue-100" },
    },
    {
      status: "completed",
      label: "Completed",
      description: "Your order has been successfully completed.",
      icon: { iconName: "check-line", bgColor: "green-800", textColor: "white" },
    },
  ];

  return (
    <div className="section__container rounded p-6">
      <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
      <div className="mb-4">
        <p>
          <strong>Order ID:</strong> {order._id}
        </p>
        <p>
          <strong>Status:</strong> {order.status}
        </p>
        <p>
          <strong>Amount:</strong> ₹{order.amount.toFixed(2)}
        </p>
        <p>
          <strong>Placed On:</strong>{" "}
          {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Timeline */}
      <h3 className="text-xl font-semibold mb-3">Order Progress</h3>
      <ol className="items-center sm:flex relative">
        {steps.map((step, index) => (
          <TimelineStep
            key={step.status}
            step={step}
            order={order}
            isCompleted={isCompleted(step.status)}
            isCurrent={isCurrent(step.status)}
            isLastStep={index === steps.length - 1}
          />
        ))}
      </ol>
    </div>
  );
};

export default OrderDetails;
