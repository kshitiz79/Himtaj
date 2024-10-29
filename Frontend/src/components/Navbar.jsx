import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CartModal from '../pages/shop/CartModal';
import avatarImg from "../assets/avatar.png";
import { logout } from '../redux/features/auth/authSlice';
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { useFetchCartQuery } from '../redux/features/cart/cartApi';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth); // First, get user data from Redux
  const userId = user?._id; // Then, define userId based on user data

  const { data: products = [], refetch } = useFetchCartQuery(userId); // Get the user ID if the user is logged in

  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

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
    { label: "Add New Post", path: "/dashboard/add-new-post" }
  ];

  const userDropdownMenus = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" }, 
    { label: "Payments", path: "/dashboard/payments" },
    { label: "Orders", path: "/dashboard/orders" },
  ];

  const dropdownMenus = user?.role === 'admin' ? adminDropdownMenus : userDropdownMenus;

  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="mx-auto px-4 flex justify-between items-center bg-[#d8f4f2]">
        <div className="nav__logo relative">
          <Link to="/">Himtaj</Link>
        </div>

        <ul className="nav__links flex-1 flex justify-center space-x-6">
          <li className='link'>
            <Link to="/">Home</Link>
          </li>
          <li className='link'>
            <Link to="/shop">Shop</Link>
          </li>
          <li className='link'>
            <Link to="/gifts">Gifting</Link>
          </li>
          <li className='link'>
            <Link to="/contact-us">Contact</Link>
          </li>
        </ul> 

        <div className="nav__icons relative">
          <span>
            <Link to="/search">
              <i className="ri-search-line"></i>
            </Link>
          </span>
          <span>
            <button onClick={handleCartToggle} className='hover:text-primary relative'>
              <i className="ri-shopping-bag-4-line"></i>
              <sup className='text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center absolute -top-2 -right-2'>
                {products.length}
              </sup>
            </button>
          </span>

          <span>
            {user ? (
              <>
                <img
                  onClick={handleDropDownToggle}
                  src={user?.profileImage || avatarImg}
                  alt="User Avatar"
                  className='size-6 rounded-full cursor-pointer'
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="font-medium space-y-4 p-2">
                      {dropdownMenus.map((menu, index) => (
                        <li key={index}>
                          <Link onClick={() => setIsDropdownOpen(false)} to={menu.path} className="dropdown-items">
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link onClick={handleLogout} className='dropdown-items'>Logout</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login"><i className="ri-user-line"></i></Link>
            )}
          </span>
        </div>
      </nav>

      {/* Pass `userId` as a prop to CartModal */}
      {isCartOpen && (
        <CartModal 
          products={products} 
          isOpen={isCartOpen} 
          onClose={handleCartToggle} 
          userId={userId} 
        />
      )}
    </header>
  );
};

export default Navbar;
