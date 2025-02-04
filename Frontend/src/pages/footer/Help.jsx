import React from "react";

const faqs = [
  {
    icon: "https://cdn-icons-png.flaticon.com/512/1087/1087815.png",
    title: "What are the payment options available?",
    description: `Payments can be made through credit cards, debit cards, international cards, net banking, or cash on delivery. Payments on www.himtajjewelry.com will only be accepted in INR for domestic orders. For international credit cards, the transaction amount will be converted to INR before the payment is accepted. Currency conversion charges may apply based on your credit card policy.`,
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/1424/1424453.png",
    title: "Which credit cards are accepted for domestic and international payments?",
    description:
      "We accept Visa, MasterCard, AMEX, Diners, and JCB for domestic and international payments.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/1170/1170576.png",
    title: "Is Cash on Delivery available?",
    description: `If you are not comfortable making an online payment on www.himtajjewelry.com, you can opt for the Cash on Delivery (COD) payment method instead. With COD, you can pay in cash at the time of delivery. The maximum order value for COD is INR 5,000. Please note, this is strictly a cash-only payment method.`,
  },
];

const HelpFAQ = () => {
  return (
    <div >
      {/* Hero Section */}
      <div >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row  items-center  py-16 px-6">
          <div className="md:w-1/2 ">
            <h1 className="text-4xl font-bold ">Help & FAQ</h1>
            <p className="mt-4 0">
              Find answers to the most frequently asked questions about payments
              and delivery options at Himtaj Jewelry.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2548/2548581.png"
              alt="Help Illustration"
              className="w-1/2 lg:ml-64 md:ml-64 ml-20"
            />
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-6xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 flex items-start space-x-4"
            >
              <img src={faq.icon} alt={faq.title} className="w-12 h-12" />
              <div>
                <h2 className="text-xl font-semibold text-black">
                  {faq.title}
                </h2>
                <p className="text-gray-600 mt-2">{faq.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Message */}
      <div className="text-center   py-10 rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-black mb-4">
    Need Further Assistance?
  </h2>
  <p className="text-gray-600 max-w-2xl mx-auto mb-6">
    If your question is not listed above, feel free to reach out to our customer support team. We are here to help and provide the best service possible.
  </p>
  <div className="flex justify-center items-center space-x-4">
    <a
      href="tel:+919773690444"
      className="flex items-center space-x-2 bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-800 transition"
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/724/724664.png"
        alt="Call Icon"
        className="w-5 h-5"
      />
      <span>Call Us</span>
    </a>
    <a
      href="mailto:info@himtajjewelry.com"
      className="flex items-center space-x-2 bg-gray-200 text-blue-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 transition"
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/732/732200.png"
        alt="Email Icon"
        className="w-5 h-5"
      />
      <span>Email Us</span>
    </a>
  </div>
</div>

    </div>
  );
};

export default HelpFAQ;
