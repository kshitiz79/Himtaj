import React from 'react';

const DeliveryInformation = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
          {/* Hero Section */}
          <div className="bg-white">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center py-16 px-6">
              <div className="md:w-1/2">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                  How can I know the status of my order?
                </h1>
                <p className="mt-4 text-gray-600">
                  All users can track their orders by clicking on Track Order. To do
                  so, they need to enter the email address used while placing the
                  order and the order number. Registered users can sign in and track
                  their orders from the order history section on the account page.
                </p>
                <button className="mt-6 px-6 py-3 bg-[#d8f4f2] text-black font-semibold rounded-lg shadow hover:bg-red-600 transition">
                  Track Order
                </button>
              </div>
              <div className="md:w-1/2 mt-8 md:mt-0">
                <img
                  src="/delivey.jpg" // Replace with your image path
                  alt="Delivery Illustration"
                  className="w-full border-xl"
                  style={{
                    borderRadius: "70% 80% 50% 60%" // Adjust values for a unique cut effect
                  }}
                />
              </div>
            </div>
          </div>
    
          {/* Card Section */}
          <div className="max-w-6xl mx-auto py-16 px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-white shadow-md rounded-lg p-6 text-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  What happens if my order is lost in transit?
                </h2>
                <p className="mt-4 text-gray-600">
                  In the unlikely event that an order gets lost during transit, we
                  wait 15 days to track it. If we are still unsuccessful, we process
                  your refund through the payment mode that you opted for when
                  placing the order.
                </p>
              </div>
              {/* Card 2 */}
              <div className="bg-white shadow-md rounded-lg p-6 text-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Where do you deliver within India?
                </h2>
                <p className="mt-4 text-gray-600">
                  Currently, we deliver to selected cities within India. Please
                  check if we deliver to your PIN code/city by entering it on the
                  product page, shopping cart, or checkout page.
                </p>
              </div>
              {/* Card 3 */}
              <div className="bg-white shadow-md rounded-lg p-6 text-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  I live outside India. Can I order something to be delivered in
                  India?
                </h2>
                <p className="mt-4 text-gray-600">
                  Yes, you can order something to be delivered in India as long as
                  you provide a valid shipping address within India. Kindly note
                  that we deliver only to selected cities within India.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    
};

export default DeliveryInformation;
