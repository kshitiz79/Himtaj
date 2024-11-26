import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

function Thanks() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <FaCheckCircle className="text-green-500 w-24 h-24 animate-bounce" />
      <h1 className="text-4xl font-bold mt-8">
        Order Successful!
      </h1>
      <p className="text-lg mt-4 text-center">
        Thank you for your purchase. Your order has been received and is being processed.
      </p>
      <button className="mt-8 px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300">
        Continue Shopping
      </button>
    </div>
  );
}

export default Thanks;
