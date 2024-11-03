import React, { useState } from "react";

const EstimatedDeliverySection = () => {
  const [pinCode, setPinCode] = useState("");
  const [deliveryMessage, setDeliveryMessage] = useState("Check delivery date for your area.");

  const handleCheckDelivery = () => {
    // Logic to check delivery based on the pin code
    // For now, we'll just simulate a delivery message
    if (pinCode === "201018") {
      setDeliveryMessage("Free Delivery by Thursday, 7th November. Order within 2 hours 47 minutes.");
    } else {
      setDeliveryMessage("Delivery is not available in your area.");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-gray-500 font-semibold">Estimated Delivery Time</h2>
      <div className="flex items-center mt-2">
        <input
          type="text"
          placeholder="Enter your PIN code"
          value={pinCode}
          onChange={(e) => setPinCode(e.target.value)}
          className="border border-gray-400 rounded py-2 px-3 mr-2 w-2/4"
        />
        <button
          onClick={handleCheckDelivery}
          className="bg-primary text-white rounded py-2 px-4"
        >
          CHECK
        </button>
      </div>
      <p className="mt-2 text-gray-700 flex items-center">
        <span className="mr-2 text-pink-500">🔒</span>
        {deliveryMessage}
      </p>
    </div>
  );
};

export default EstimatedDeliverySection;
