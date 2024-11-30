import React, { useEffect, useRef } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Thanks() {
  const navigate = useNavigate();
  const successMessageRef = useRef(null);

  useEffect(() => {
    // Focus the success message for screen readers
    if (successMessageRef.current) {
      successMessageRef.current.focus();
    }
  }, []);

  const handleContinueShopping = () => {
    navigate('/shop'); // Redirect to your shop or homepage
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] bg-white px-4">
      <FaCheckCircle
        className="text-green-500 w-24 h-24 animate-bounce"
        aria-hidden="true"
      />
      <h1
        ref={successMessageRef}
        tabIndex={-1}
        className="text-4xl font-bold"
        aria-label="Order Successful!"
      >
        Order Successful!
      </h1>
      <p className="text-lg mt-4 text-center">
        Thank you for your purchase. Your order has been received and is being processed.
      </p>
      <button
        className="mt-8 px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300"
        onClick={handleContinueShopping}
        aria-label="Continue Shopping"
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default Thanks;
