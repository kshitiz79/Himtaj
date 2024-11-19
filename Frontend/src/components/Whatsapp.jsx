import React from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // Install react-icons if not already

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/919773690444" // Replace with your WhatsApp number
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-5 bottom-24 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer z-50 transition-transform duration-300 hover:scale-110 hover:shadow-xl md:right-3 md:bottom-32 md:w-12 md:h-12"
    >
      <FaWhatsapp className="text-3xl md:text-2xl" />
    </a>
  );
};

export default WhatsAppButton;
