import { Link } from "react-router-dom";
import { HiOutlineX } from "react-icons/hi";
import logo from "../assets/logo.png";

const SidebarMenu = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <>
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="relative bg-white w-72 h-full shadow-lg flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <img src={logo} alt="Logo" className="w-20 h-20" />
              <HiOutlineX
                className="text-2xl cursor-pointer text-gray-800 hover:text-gray-600 transition-colors duration-300"
                onClick={() => setIsSidebarOpen(false)}
              />
            </div>
            <nav className="flex flex-col p-4 space-y-4">
              <Link to="/" className="text-lg font-medium text-gray-700 hover:text-yellow-600 transition-colors duration-300">
                Home
              </Link>
              <Link to="/shop" className="text-lg font-medium text-gray-700 hover:text-yellow-600 transition-colors duration-300">
                Products
              </Link>
              <Link to="/categories" className="text-lg font-medium text-gray-700 hover:text-yellow-600 transition-colors duration-300">
                Categories
              </Link>
              <Link to="/contact" className="text-lg font-medium text-gray-700 hover:text-yellow-600 transition-colors duration-300">
                Contact
              </Link>
              <Link to="/about" className="text-lg font-medium text-gray-700 hover:text-yellow-600 transition-colors duration-300">
                About Us
              </Link>
              <Link to="/recipes" className="text-lg font-medium text-gray-700 hover:text-yellow-600 transition-colors duration-300">
                Recipes
              </Link>
            </nav>
            <div className="flex flex-col p-4 space-y-4 border-t border-gray-200">
              <Link to="/login" className="text-lg font-medium text-gray-700 hover:text-yellow-600 transition-colors duration-300">
                Login
              </Link>
              <Link to="/signup" className="text-lg font-medium text-gray-700 hover:text-yellow-600 transition-colors duration-300">
                Sign Up
              </Link>
            </div>
            <div className="flex-1 flex flex-col justify-end p-4 space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-yellow-500 rounded-md transform rotate-45 shadow-md"></div>
                <div className="w-8 h-8 bg-yellow-500 rounded-md transform rotate-45 shadow-md"></div>
                <div className="w-8 h-8 bg-yellow-500 rounded-md transform rotate-45 shadow-md"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-yellow-500 rounded-md transform rotate-45 shadow-md"></div>
                <div className="w-8 h-8 bg-yellow-500 rounded-md transform rotate-45 shadow-md"></div>
                <div className="w-8 h-8 bg-yellow-500 rounded-md transform rotate-45 shadow-md"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarMenu;