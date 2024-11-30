import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartModal from "../pages/shop/CartModal";
import avatarImg from "../assets/avatar.png";
import { logout } from "../redux/features/auth/authSlice";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { useFetchCartQuery } from "../redux/features/cart/cartApi";
import Search from "./Search";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;

  const { data: products = [], refetch } = useFetchCartQuery(userId);

  // State to handle cart modal visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropDownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const adminDropdownMenus = [
    { label: "Dashboard", path: "/dashboard/admin" },
    { label: "Manage Items", path: "/dashboard/manage-products" },
    { label: "All Orders", path: "/dashboard/manage-orders" },
    { label: "Add New Post", path: "/dashboard/add-new-post" },
  ];

  const userDropdownMenus = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "Payments", path: "/dashboard/payments" },
    { label: "Orders", path: "/dashboard/orders" },
  ];

  const dropdownMenus = user?.role === "admin" ? adminDropdownMenus : userDropdownMenus;

  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed-nav-bar w-full">
      <nav className="mx-auto px-4 flex items-center justify-between bg-[#d8f4f2] relative">
        {/* Left side */}
        <div className="flex items-center space-x-3">
          {/* Mobile menu icon - only visible on mobile */}
          <div className="md:hidden">
            <button onClick={handleMobileMenuToggle} className="text-2xl">
              <i className={isMobileMenuOpen ? "ri-close-line" : "ri-menu-line"}></i>
            </button>
          </div>
          <span className="md:hidden">
            <Link to="/search">
              <i className="ri-search-line" style={{ fontSize: "20px", width: "28px" }}></i>
            </Link>
          </span>
          {/* Placeholder for desktop to maintain spacing */}
          <div className="hidden md:block w-8"></div>
        </div>

        {/* Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none">
          <Link to="/">
            <img src="/nav_logo.png" alt="Logo" className="lg:h-14 h-12 " />
          </Link>
        </div>

        {/* Navigation links - visible on desktop */}
        <ul className="nav__links hidden md:flex flex-1 justify-center space-x-6">
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="link">
            <Link to="/gifts">Gifting</Link>
          </li>
          <li className="link">
            <Link to="/collection">New Collection</Link>
          </li>
        </ul>

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          {/* Search component - visible only on desktop */}
          <span className="hidden md:inline">
            <Search />
          </span>

          {/* Cart Icon */}
          <span>
            <button onClick={openCart} className="hover:text-primary relative">
              <i className="ri-shopping-bag-4-line"></i>
              <sup className="text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center absolute -top-2 -right-2">
                {products.length}
              </sup>
            </button>
          </span>

          {/* User Icon */}
          <span>
            {user ? (
              <>
                <img
                  onClick={handleDropDownToggle}
                  src={user?.profileImage || avatarImg}
                  alt="User Avatar"
                  className="w-6 h-6 rounded-full cursor-pointer"
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="font-medium space-y-4 p-2">
                      {dropdownMenus.map((menu, index) => (
                        <li key={index}>
                          <Link
                            onClick={() => setIsDropdownOpen(false)}
                            to={menu.path}
                            className="dropdown-items"
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button onClick={handleLogout} className="dropdown-items">
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <i className="ri-user-line"></i>
              </Link>
            )}
          </span>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <ul className="bg-[#d8f4f2] space-y-4 p-4 text-left">
            <li className="link">
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/">
                Home
              </Link>
            </li>
            <li className="link">
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/shop">
                Shop
              </Link>
            </li>
            <li className="link">
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/gifts">
                Gifting
              </Link>
            </li>
            <li className="link">
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/collection">
                New Collection
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Cart Modal */}
      {isCartOpen && (
        <CartModal
          products={products}
          isOpen={isCartOpen}
          onClose={closeCart} // Pass closeCart here
          userId={userId}
        />
      )}
    </header>
  );
};

export default Navbar;
