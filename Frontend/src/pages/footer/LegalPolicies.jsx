import React from "react";

const LegalPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center py-16 px-6">
          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold ">Privacy Notice</h1>
            <p className="mt-4">
              Himtaj Jewelry is committed to protecting your privacy and ensuring the security of your personal information. 
              This notice outlines how we handle your data to ensure transparency.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              src="/path-to-privacy-image.png" // Replace with your illustration path
              alt="Privacy Illustration"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-16 px-6">
        {/* Section: Address */}
        <div className="mb-12 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold  mb-4">
            Registered Office
          </h2>
          <p className="text-gray-600">
            T3-236, Golden-I, Techzone IV, Greater Noida West, Uttar Pradesh, 201306
          </p>
        </div>

        {/* Section: Introduction */}
        <div className="mb-12 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Introduction
          </h2>
          <p className="text-gray-600">
            This Privacy Notice outlines the types of personal information we collect, how we use it, the parties we may
            share it with, and the measures we take to safeguard your data. By accessing our website, sub-domains, or mobile applications, you agree to this policy.
          </p>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section 1 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold  mb-4">1. Definitions</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>
                <strong>Cookies:</strong> Small files placed on your device to remember your preferences.
              </li>
              <li>
                <strong>Data:</strong> Includes personal and non-personal information collected from you.
              </li>
              <li>
                <strong>Service Providers:</strong> Entities processing data on our behalf.
              </li>
              <li>
                <strong>User or You:</strong> Natural person accessing our stores, website, or mobile applications.
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold  mb-4">2. Data We Collect</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Contact Information: Name, email, phone, and address.</li>
              <li>Financial Information: Payment details and transaction history.</li>
              <li>Technical Information: IP address, cookies, and device details.</li>
              <li>Personal Information: Demographic data like age and gender.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold  mb-4">3. How We Collect Data</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Information You Provide: During purchase, registration, or communication.</li>
              <li>Automated Means: Cookies and analytics tools.</li>
              <li>Third-Party Sources: From partners or affiliates.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold  mb-4">4. Use of Data</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>To process orders and provide services.</li>
              <li>To improve our products and user experience.</li>
              <li>To communicate promotional offers and updates.</li>
              <li>To analyze customer behavior for marketing insights.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-gray-600">
            For more information, contact us at{" "}
            <a href="mailto:info@himtajjewelry.com" className=" underline">
              info@himtajjewelry.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalPolicy;
