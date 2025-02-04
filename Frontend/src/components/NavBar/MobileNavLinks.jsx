import React from "react";
import { Link } from "react-router-dom";

const MobileNavLinks = ({ isMobileMenuOpen, handleMobileMenuToggle }) => {
  return (
    <>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <ul className="bg-[#d8f4f2] space-y-4 p-4 text-left">
            <li className="link">
              <Link onClick={handleMobileMenuToggle} to="/">
                FOR HER
              </Link>
            </li>
            <li className="link">
              <Link onClick={handleMobileMenuToggle} to="/shop">
                FOR HIM
              </Link>
            </li>
            <li className="link">
              <Link onClick={handleMobileMenuToggle} to="/gifts">
                ALL Collections
              </Link>
            </li>
            <li className="link">
              <Link onClick={handleMobileMenuToggle} to="/collection">
                Gifts
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default MobileNavLinks;
