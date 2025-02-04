import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer className="section__container footer__container bg-[#f2e5e9] p-4 lg:p-10">
        {/* Logo Section */}
        <div className="footer__col flex justify-center lg:justify-start">
          <img src="/logo4.png" className="w-32 h-32 lg:w-44 lg:h-48 lg:ml-10 lg:mt-3" alt="Logo" />
        </div>

        {/* Useful Links */}
        <div className="footer__col text-center lg:text-left mt-4 lg:mt-0">
          <h4 className="text-lg font-semibold mb-2">Useful Links</h4>
          <Link to="/delivery-information" className="block text-sm">Delivery Information</Link>
          <Link to="/return-exchange" className="block text-sm">Returns</Link>
          <Link to="/delivery-information" className="block text-sm">Shipping</Link>
          <Link to="/legal-policy" className="block text-sm">Legal Policy</Link>
          <Link to="/" className="block text-sm">Terms & Conditions</Link>
        </div>

        {/* Information */}
        <div className="footer__col text-center lg:text-left mt-4 lg:mt-0">
          <h4 className="text-lg font-semibold mb-2">Information</h4>
          <Link to="/" className="block text-sm">About Us</Link>
          <Link to="/" className="block text-sm">Blog</Link>
          <Link to="/cancellation-policy" className="block text-sm">Cancellation Policy</Link>
          <Link to="/help" className="block text-sm">Help & FAQ</Link>
          <Link to="/legal-policy" className="block text-sm">Privacy Policy</Link>
        </div>

        {/* Contact Us */}
        <div className="footer__col text-center lg:text-left mt-4 lg:mt-0">
          <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
          <p className="text-black text-sm">+91 9773690444</p>
          <Link to="/contact-us" className="block text-sm">Chat With Us</Link>
          <Link to="/" className="block text-sm">WhatsApp Chat With Us</Link>
        </div>
      </footer>

      {/* Bottom Footer */}
      <footer className="section__container3 text-black text-center p-4 lg:flex lg:justify-between flex-col lg:flex-row">
        <p className="text-sm">©2025 Copyright Himtaj Jewelry. All Rights Reserved.</p>
        <p className="text-sm">Powered by RBSH Studio</p>
      </footer>
    </>
  );
};

export default Footer;
