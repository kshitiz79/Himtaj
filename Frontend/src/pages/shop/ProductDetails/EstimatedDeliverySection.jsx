import React, { useState } from "react";

const EstimatedDeliverySection = () => {
  const [pinCode, setPinCode] = useState("");
  const [deliveryMessage, setDeliveryMessage] = useState("Check delivery date for your area.");

  const handleCheckDelivery = () => {
    if (/^\d{6}$/.test(pinCode)) {
      const deliveryDays = Math.floor(Math.random() * 4) + 7; // Random number between 7 and 10
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);

      const options = { weekday: "long", month: "long", day: "numeric" };
      const formattedDate = deliveryDate.toLocaleDateString("en-US", options);

      setDeliveryMessage(`Delivery by ${formattedDate}.`);
    } else {
      setDeliveryMessage("Please enter a valid 6-digit PIN code.");
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
