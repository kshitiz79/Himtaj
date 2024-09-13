import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="fixed-nav-bar w-nav ">
      <nav className=" mx-auto px-4 flex justify-between items-center bg-[#fcf9f0]">

      
      <div className="nav__logo relative" >
          <Link to="/">Himtaj </Link>
        </div>


        <ul className="nav__links flex-1 flex justify-center space-x-6">
          
          <li className='link'>
            <Link to="/">Home</Link>
          </li>
          <li className='link'>
            <Link to="/shop">Shop</Link>
          </li>
          <li className='link'>
            <Link to="/">Pages</Link>
          </li>
          <li className='link'>
            <Link to="/contact">Contact</Link>
          </li>
        </ul> 
        
      

        <div className="nav__icons relative" >
          <span>
            <Link to="/search">
            <i className="ri-search-line"></i>
            </Link>
          </span>
<span>
  <button className='hover:text-primary'>
  <i className="ri-shopping-bag-4-line"></i>
  <sup className='text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center'>0
    
  </sup>
  </button>
</span>
<span>
  <Link to="login">
  <i className="ri-user-line"></i>
  </Link>
</span>
        </div>
      </nav>
    </header>

  );
};

export default Navbar;
