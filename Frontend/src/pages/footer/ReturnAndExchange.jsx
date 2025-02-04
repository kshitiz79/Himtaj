import React from "react";

const ReturnExchange = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-left mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Return and Exchange</h1>
          <p className="text-gray-600 mt-4 w-3/4">
            Find answers to your questions about cancellations, returns, and exchanges. At Himtaj Jewelry, we strive to ensure a seamless shopping experience for you.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* FAQ 1 */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-start">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              How can I cancel my order?
            </h2>
            <p className="text-gray-600">
              Orders once placed can only be cancelled prior to shipment. Refer to our <a href="/cancellation-policy" className="text-blue-600 underline">Cancellation Policy</a> for more details.
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-start">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Can I replace my order if I change my mind about the size?
            </h2>
            <p className="text-gray-600">
              Yes, it is possible to return the unused product and order a replacement. Please refer to our <a href="/return-policy" className="text-blue-600 underline">Return Policy</a> for more details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnExchange;
