import React from "react";

const CancellationPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center py-16 px-6">
          <div className="md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
              Cancellation Policy
            </h1>
            <p className="mt-4 text-gray-600">
              We understand that plans can change, and we strive to make your
              shopping experience with Himtaj Jewelry as seamless as possible.
              Please review our cancellation policy to understand your options
              for making changes or canceling your orders.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              src="/path-to-cancellation-image.png" // Replace with your image path
              alt="Cancellation Illustration"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Policy Section */}
      <div className="max-w-6xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="bg-white shadow-md rounded-lg p-6 flex items-start space-x-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
              alt="Order Cancellation"
              className="w-16 h-16"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Order Cancellation
              </h2>
              <p className="mt-2 text-gray-600">
                • <strong>Before Dispatch:</strong> Cancel your order anytime
                before dispatch by contacting customer support.
              </p>
              <p className="mt-2 text-gray-600">
                • <strong>After Dispatch:</strong> Cancellation is no longer
                possible. Returns or exchanges may apply as per our return
                policy.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-md rounded-lg p-6 flex items-start space-x-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2645/2645861.png"
              alt="Cancellation Charges"
              className="w-16 h-16"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Cancellation Charges
              </h2>
              <p className="mt-2 text-gray-600">
                • No charges for cancellations before dispatch. A full refund
                will be initiated.
              </p>
              <p className="mt-2 text-gray-600">
                • Custom or personalized orders cannot be canceled once they are
                in production.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-md rounded-lg p-6 flex items-start space-x-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828750.png"
              alt="Refund Process"
              className="w-16 h-16"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Refund Process
              </h2>
              <p className="mt-2 text-gray-600">
                • Refunds will be processed within 7-10 business days after
                cancellation confirmation.
              </p>
              <p className="mt-2 text-gray-600">
                • Refund timing may vary depending on your payment provider.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white shadow-md rounded-lg p-6 flex items-start space-x-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1589/1589725.png"
              alt="Exclusions"
              className="w-16 h-16"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Exclusions</h2>
              <p className="mt-2 text-gray-600">
                • Personalized or customized jewelry cannot be canceled after
                purchase.
              </p>
              <p className="mt-2 text-gray-600">
                • Cancellation during promotional sales depends on the specific
                terms of the sale.
              </p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-white shadow-md rounded-lg p-6 flex items-start space-x-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3183/3183458.png"
              alt="How to Cancel"
              className="w-16 h-16"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                How to Cancel an Order
              </h2>
              <p className="mt-2 text-gray-600">
                • Contact our support team with your order number to request
                cancellation. Our team will assist and confirm once completed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicy;
