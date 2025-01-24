import { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { HiShoppingBag } from "react-icons/hi2";
import { IoMenu } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    showSearch,
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  //logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems([]);
    navigate("/login");
  };
  return (
    <>
      <div className="flex items-center justify-between bg-gradient-to-r bg-gray-900 text-white px-6 py-4 rounded-lg shadow-lg mb-4">
        {/* Brand Logo */}
        <Link to="/" className="text-2xl font-serif font-bold">
          LapyE-shop
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden sm:flex gap-8 text-sm">
          {[
            { path: "/", label: "Home" },
            { path: "/about", label: "About" },
            { path: "/collection", label: "Collection" },
            { path: "/contact", label: "Contact" },
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative group ${isActive ? "text-yellow-300" : ""}`
              }
            >
              <p className="transition-all duration-300">{item.label}</p>
              <span className="absolute bottom-0 left-1/2 w-0 group-hover:w-1/2 h-[2px] bg-yellow-300 transition-all duration-300 transform -translate-x-1/2"></span>
            </NavLink>
          ))}
        </ul>

        {/* Action Icons */}
        <div className="flex items-center gap-4">
          {/* Search Icon */}
          <div
            onClick={() => {
              console.log("Search Icon Clicked!");
              setShowSearch(!showSearch);
            }}
            className="cursor-pointer p-2 rounded-full hover:bg-indigo-800 transition"
          >
            <CiSearch className="text-xl" />
          </div>

          {/* Profile Dropdown */}
          <div className="relative group">
            <Link to="/login">
              <CgProfile
                className="text-2xl cursor-pointer hover:text-yellow-300 transition"
                onClick={() => (token ? null : navigate("/login"))}
              />
            </Link>
            {token && (
              <div className="hidden group-hover:flex flex-col absolute right-0 mt-2 bg-white text-gray-700 w-36 py-3 px-4 rounded-lg shadow-lg z-50">
                <p
                  className="hover:text-indigo-600 cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  My Profile
                </p>
                <p
                  className="hover:text-indigo-600 cursor-pointer"
                  onClick={() => navigate("/orders")}
                >
                  Orders
                </p>
                <p
                  className="hover:text-red-500 cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </p>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <HiShoppingBag className="text-2xl" />
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-400 text-xs text-black rounded-full flex items-center justify-center">
              {getCartCount()}
            </span>
          </Link>

          {/* Mobile Menu Icon */}
          <IoMenu
            className="sm:hidden text-2xl cursor-pointer hover:text-yellow-300 transition"
            onClick={() => setVisible(true)}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <IoMdArrowRoundBack />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;
