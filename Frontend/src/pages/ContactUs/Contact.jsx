import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import profileImage from '../../assets/category5.png'; // Replace this with the actual path to the logo

export const Contact = () => {
  const formRef = useRef();
  const cardRef = useRef();

  useEffect(() => {
    gsap.from(formRef.current, { opacity: 0, y: 150, duration: 3 });
 
  }, []);

  return (
    <>
                          <h1 className='text-6xl text-center mt-16 font-extrabold  ' >Contact Us</h1>
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen py-12 gap-16">

      <div
     
        className="w-full max-w-md h-[30rem] bg-white rounded-xl shadow-lg p-6 text-center transform transition duration-300 hover:scale-105"
      >
        <img src={profileImage} alt="Himtaj Jewelry Logo" className="w-20 h-20 mx-auto rounded-full mb-4 border-4 border-gray-200" />
        <h4 className="text-lg font-semibold text-pink-600">@HIMTAJJEWELRY</h4>
        <h5 className="text-xl font-bold text-gray-800 mt-4">HIMTAJ JEWELRY</h5>
        <p className="text-gray-600 text-sm mt-3">Fine Silver Jewelry</p>
        <p className="text-gray-600 text-sm">WhatsApp Support: +91 97736 90444</p>
        <p className="text-gray-600 text-sm mb-4">DM us on Instagram to order...</p>
        <div className="flex flex-col space-y-2 mt-12">
          <a
            href="https://www.instagram.com/himtajjewelry"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pink-600 text-white px-4 py-2 rounded-full font-semibold transition transform hover:bg-pink-700 hover:scale-105"
          >
            🛍️ Shopping & Retail
          </a>
          <a
            href="https://wa.me/c/919773690444"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold transition transform hover:bg-green-600 hover:scale-105"
          >
            🔗 wa.me/c/919773690444
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <div
        ref={formRef}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">Contact Form</h3>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              placeholder="Write your message here..."
              className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-pink-600 text-white font-semibold rounded-md transition transform hover:bg-pink-700 hover:scale-105"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </>
  );
};
