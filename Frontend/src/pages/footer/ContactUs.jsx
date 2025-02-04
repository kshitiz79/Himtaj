import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-gray-50 py-20 p-1 flex items-center justify-center">
      <div className="max-w-6xl w-full">
        {/* Header Section */}
        <div className="text-left mb-12">
          <h1 className="text-4xl font-bold w-full text-gray-800">Get in touch</h1>
          <p className="text-gray-600 mt-4 w-3/4">
            For any queries regarding cancellations, feel free to contact our
            customer support team. At Himtaj Jewelry, we are committed to
            providing a transparent and hassle-free shopping experience. If you
            have further questions, please reach out, and we’ll be happy to
            assist you.
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Phone Card */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
            <div className="bg-blue-100 rounded-full p-4 mb-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/483/483947.png"
                alt="Phone Icon"
                className="w-10 h-10"
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Call Us</h2>
            <p className="text-gray-600 mt-2">
              Have questions? Give us a call, and we’ll be happy to assist you.
            </p>
            <p className="text-blue-600 font-bold mt-4 text-lg">+91 9773690444</p>
          </div>

          {/* Email Card */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
            <div className="bg-blue-100 rounded-full p-4 mb-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/732/732200.png"
                alt="Email Icon"
                className="w-10 h-10"
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Email Us</h2>
            <p className="text-gray-600 mt-2">
              Prefer email? No problem! Reach out to us, and we’ll get back to
              you as soon as possible.
            </p>
            <p className="text-blue-600 font-bold mt-4 text-lg">
              <a href="mailto:info@himtajjewelry.com">info@himtajjewelry.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
