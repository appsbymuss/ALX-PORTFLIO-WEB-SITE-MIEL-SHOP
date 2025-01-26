import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch, FaUser, FaShoppingCart, FaBars, FaTimes, FaTrash } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import Logoheader from "../assets/logoheader.png";
import customFetch from "../axios/custom";
import { fetchCollections } from "../features/collections/collectionsSlice";
import { RootState } from "../store";
import { removeProductFromTheCart, updateProductQuantity } from "../features/cart/cartSlice";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const collections = useSelector((state: RootState) => state.collections.items);
  const cart = useSelector((state: RootState) => state.cart);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [editQuantity, setEditQuantity] = useState<{ [key: number]: number }>({});
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCollections());
  }, [dispatch]);

  const handleSearch = async () => {
    if (searchQuery.trim() === "") return;
    try {
      const response = await customFetch.get(`/products?search=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      setTimeout(() => {
        setIsDropdownOpen(false);
      }, 3000);
    }
  };

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleRemoveProduct = (id: number) => {
    dispatch(removeProductFromTheCart({ id }));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateProductQuantity({ id, quantity }));
  };

  const handleEditQuantityChange = (id: number, quantity: number) => {
    setEditQuantity((prev) => ({ ...prev, [id]: quantity }));
    handleUpdateQuantity(id, quantity);
  };

  return (
    <header className="sticky top-0 z-50 shadow-lg bg-white">
      {/* Top Bar */}
      <div className="bg-[#FFB606] text-white text-center py-2 text-sm">
        Livraison gratuite pour toute commande supérieure à 55
      </div>

      {/* Navigation Bar */}
      <nav className="bg-[#000000] text-white">
        <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={Logoheader}
              alt="Logo"
              className="w-[70px] h-[60px] object-contain"
            />
          </Link>

          {/* Center Section: Navigation Links */}
          <ul className="hidden md:flex items-center space-x-6 mx-auto">
            <li>
              <Link to="/" className="hover:text-yellow-500 transition">
                Acceuil
              </Link>
            </li>
            <li>
              <Link
                to="/nos-miels"
                className="hover:text-yellow-500 transition"
              >
                Nos miels
              </Link>
            </li>
            <li
              className="relative group"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
              onClick={handleDropdownClick}
            >
              <button className="flex items-center hover:text-yellow-500">
                Nos Collections
                <IoMdArrowDropdown className="ml-1 text-sm" />
              </button>
              {isDropdownOpen && (
                <ul className="absolute left-0 mt-2 bg-[#FEF7F1] text-gray-800 shadow-lg rounded-md py-2 w-40">
                  {collections.map((collection) => (
                    <li key={collection.id} className="hover:bg-gray-100 px-4 py-2">
                      <Link to={`/collections/${collection.id}`}>{collection.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <Link
                to="/suivre-mon-commande"
                className="hover:text-yellow-500 transition"
              >
                Suivre ma commande
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-500 transition">
                Contact
              </Link>
            </li>
          </ul>

          {/* Right Section: Currency, Country, Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <div
              className="relative"
              onMouseEnter={() => setIsCurrencyDropdownOpen(true)}
              onMouseLeave={() => setIsCurrencyDropdownOpen(false)}
            >
              <button className="flex items-center space-x-1 text-white hover:text-yellow-500">
                <span>FR</span>
                <span>€</span>
                <IoMdArrowDropdown className="text-sm" />
              </button>
              {isCurrencyDropdownOpen && (
                <ul className="absolute left-0 mt-2 bg-[#FEF7F1] text-gray-800 shadow-lg rounded-md py-2 w-32">
                  <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer flex items-center space-x-1">
                    <span>FR</span>
                    <span>€</span>
                  </li>
                  <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer flex items-center space-x-1">
                    <span>DE</span>
                    <span>€</span>
                  </li>
                  <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer flex items-center space-x-1">
                    <span>ES</span>
                    <span>€</span>
                  </li>
                  <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer flex items-center space-x-1">
                    <span>IT</span>
                    <span>€</span>
                  </li>
                  <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer flex items-center space-x-1">
                    <span>NL</span>
                    <span>€</span>
                  </li>
                </ul>
              )}
            </div>
            <button
              className="text-xl hover:text-yellow-500"
              onClick={handleSearchToggle}
            >
              {isSearchOpen ? <FaTimes /> : <FaSearch />}
            </button>
            <Link to="/user-profile" className="text-xl hover:text-yellow-500">
              <FaUser />
            </Link>
            <div className="relative">
              <button
                className="text-xl hover:text-yellow-500"
                onClick={handleCartToggle}
              >
                <FaShoppingCart />
              </button>
              {isCartOpen && (
                <div className="absolute right-0 mt-2 bg-white text-gray-800 shadow-lg rounded-md py-2 w-64">
                  {cart.productsInCart.length > 0 ? (
                    cart.productsInCart.map((product) => (
                      <div key={product.id} className="flex items-center justify-between px-4 py-2 border-b">
                        <div className="flex items-center space-x-2">
                          <img src={product.image_url} alt={product.name} className="w-10 h-10 object-contain" />
                          <span>{product.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            value={editQuantity[product.id] !== undefined ? editQuantity[product.id] : product.quantity}
                            onChange={(e) => handleEditQuantityChange(product.id, parseInt(e.target.value))}
                            className="w-12 text-center border rounded-md"
                          />
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleRemoveProduct(product.id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2">Votre panier est vide.</div>
                  )}
                  <div className="px-4 py-2">
                    <button
                      className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600"
                      onClick={() => navigate("/cart")}
                    >
                      Voir le panier
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-2xl md:hidden hover:text-yellow-500 transition"
          >
            <FaBars />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-[#000000] text-white z-50 p-6 overflow-y-auto">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-2xl hover:text-yellow-500"
            >
              ✕
            </button>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="block hover:text-yellow-500">
                  Acceuil
                </Link>
              </li>
              <li>
                <Link to="/nos-miels" className="block hover:text-yellow-500">
                  Nos miels
                </Link>
              </li>
              <li>
                <Link
                  to="/collections"
                  className="block hover:text-yellow-500"
                >
                  Nos Collections
                </Link>
              </li>
              <li>
                <Link
                  to="/suivre-mon-commande"
                  className="block hover:text-yellow-500"
                >
                  Suivre ma commande
                </Link>
              </li>
              <li>
                <Link to="/contact" className="block hover:text-yellow-500">
                  Contact
                </Link>
              </li>
              <li>
                <button
                  className="block hover:text-yellow-500"
                  onClick={() =>
                    setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)
                  }
                >
                  FR € <IoMdArrowDropdown className="ml-1 text-sm" />
                </button>
                {isCurrencyDropdownOpen && (
                  <ul className="bg-white text-gray-800 shadow-lg rounded-md py-2 w-40 mt-2">
                    <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                      FR €
                    </li>
                    <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                      DE €
                    </li>
                    <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                      ES €
                    </li>
                    <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                      IT €
                    </li>
                    <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                      NL €
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <button
                  className="text-xl hover:text-yellow-500"
                  onClick={handleSearchToggle}
                >
                  {isSearchOpen ? <FaTimes /> : <FaSearch />}
                </button>
                {isSearchOpen && (
                  <input
                    type="text"
                    className="ml-2 p-1 rounded text-black"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />
                )}
              </li>
              <li>
                <Link to="/profile" className="text-xl hover:text-yellow-500">
                  <FaUser />
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-xl hover:text-yellow-500">
                  <FaShoppingCart />
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Search Input */}
      {isSearchOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg py-2 px-4 flex justify-center items-center">
          <input
            type="text"
            className="w-full max-w-lg p-2 border rounded"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            className="ml-2 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            onClick={handleSearch}
          >
            Rechercher
          </button>
          <button
            className="ml-2 p-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleSearchToggle}
          >
            <FaTimes />
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
