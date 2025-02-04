import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// Redux and API hooks
import { logout } from "./../../redux/features/auth/authSlice";
import { useLogoutUserMutation } from "./../../redux/features/auth/authApi";
import { useFetchCartQuery } from "./../../redux/features/cart/cartApi";

// Components
import TopPromotionBar from "./TopPromotionBar";
import MobileNavLinks from "./MobileNavLinks";
import DesktopNavLinks from "./DesktopNavLinks";
import CartModal from "./../../pages/shop/CartModal";
import Search from "./../Search";

// Assets
import avatarImg from "./../../assets/avatar.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Auth
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;

  // Fetch Cart Items
  const { data: products = [] } = useFetchCartQuery(userId);

  // Logout
  const [logoutUser] = useLogoutUserMutation();
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  // Cart Modal State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Dropdown (Profile) State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropDownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Dropdown menu arrays
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

  // For Her Categories
  const forHerCategories = [
    { label: "Earrings", path: "/gender/female/category/Earrings" },
    { label: "Necklaces", path: "/gender/female/category/Necklaces" },
    { label: "Bracelets", path: "/gender/female/category/Bracelets" },
    { label: "Rings", path: "/gender/female/category/Rings" },
    { label: "Studs", path: "/gender/female/category/Studs" },
    { label: "Ankles", path: "/gender/female/category/Ankles" },
    { label: "Fashion Jewelry", path: "/gender/female/category/Fashion+Jewelry" },
    { label: "Gold Jewelry", path: "/gender/female/category/Gold+Jewelry" },
  ];
  
  const forHimCategories = [
    { label: "Bracelets", path: "/gender/male/category/Bracelets" },
    { label: "Studs", path: "/gender/male/category/Studs" },
    { label: "Chain", path: "/gender/male/category/Chain" },
    { label: "Rings", path: "/gender/male/category/Rings" },
    { label: "Gold Jewelry", path: "/gender/male/category/Gold+Jewelry" },
    { label: "Fashion Jewelry", path: "/gender/male/category/Fashion+Jewelry" },
  ];
  

  return (
    <>
      {/* Top Bar with Promotion */}
      <TopPromotionBar />

      <header className="fixed-nav-bar w-full">
        {/* Main Navbar Container */}
        <nav className="mx-auto px-4 flex items-center justify-between py-6 relative">
          {/* Left Side: Hamburger (Mobile) + Logo */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu toggle */}
            <div className="md:hidden">
              <button onClick={handleMobileMenuToggle} className="text-2xl">
                <i className={isMobileMenuOpen ? "ri-close-line" : "ri-menu-line"}></i>
              </button>
            </div>

            {/* Logo */}
            <Link to="/">
              <img
                src="/nav_logo.png"
                alt="Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Center: Desktop Navigation Links (hidden on mobile) */}
          <div className="hidden md:block">
            <DesktopNavLinks
              forHerCategories={forHerCategories}
              forHimCategories={forHimCategories}
            />
          </div>

          {/* Right Side: Desktop Search + Cart + User Profile */}
          <div className="flex items-center space-x-4">
            {/* Desktop Search (hidden on mobile) */}
            <span className="hidden md:inline">
              <Search />
            </span>

            {/* Cart Icon */}
            <button
              onClick={openCart}
              className="hover:text-primary relative text-xl"
            >
              <i className="ri-shopping-bag-4-line"></i>
              {products.length > 0 && (
                <sup className="text-xs px-1 text-white rounded-full bg-primary text-center absolute -top-2 -right-2">
                  {products.length}
                </sup>
              )}
            </button>

            {/* User Profile / Avatar */}
            {user ? (
              <div className="relative">
                <img
                  onClick={handleDropDownToggle}
                  src={user?.profileImage || avatarImg}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="font-medium space-y-2 p-2">
                      {dropdownMenus.map((menu, index) => (
                        <li key={index}>
                          <Link
                            onClick={() => setIsDropdownOpen(false)}
                            to={menu.path}
                            className="block px-3 py-1 hover:bg-gray-100"
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-3 py-1 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-xl">
                <i className="ri-user-line"></i>
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile Navigation Links (shown when isMobileMenuOpen = true) */}
        <MobileNavLinks
          isMobileMenuOpen={isMobileMenuOpen}
          handleMobileMenuToggle={() => setIsMobileMenuOpen(false)}
        />

        {/* Cart Modal */}
        {isCartOpen && (
          <CartModal
            products={products}
            isOpen={isCartOpen}
            onClose={closeCart}
            userId={userId}
          />
        )}
      </header>
    </>
  );
};

export default Navbar;
