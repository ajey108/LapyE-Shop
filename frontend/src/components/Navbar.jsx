import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

import { CiSearch } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { CiShoppingCart } from "react-icons/ci";
import menu_icon from "../assets/menu_icon.png";
import dropdown_icon from "../assets/dropdown_icon.png";
import laplogo from "../assets/laplogo.webp";
import { toast } from "react-toastify";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [dark, setDark] = useState("light");

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  //logout
  const logout = () => {
    navigate("/login");
    toast.success("Logged out ");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };
  //darkmode
  useEffect(() => {
    document.documentElement.classList.toggle("dark");
  }, [dark]);

  // ui
  return (
    <div className={dark == "dark" ? "dark" : "light"}>
      <div className="flex dark:text-white items-center justify-between py-5 font-medium">
        <Link to="/">
          <img
            src={laplogo}
            className="w-12 rounded-lg object-contain"
            alt="laplogo"
          />
        </Link>

        <ul className="hidden sm:flex gap-5 text-sm   ">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>HOME</p>
            <hr className="w-3/4 border-none h-[1.2px] bg-gray-700  hidden" />
          </NavLink>
          <NavLink
            to="/collection"
            className="flex flex-col items-center  gap-1"
          >
            <p>COLLECTION</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700  hidden" />
          </NavLink>
          <NavLink to="/about" className="flex flex-col items-center gap-1">
            <p>ABOUT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/contact" className="flex flex-col items-center gap-1">
            <p>CONTACT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </ul>

        <div className="flex  items-center gap-6">
          <CiSearch
            onClick={() => {
              setShowSearch(true);
              navigate("/collection");
            }}
            className="w-5  cursor-pointer hover:opacity-80 dark:hover:text-blue-400"
          />

          <div className="group relative">
            <FiUser
              onClick={() => (token ? null : navigate("/login"))}
              className="w-5 cursor-pointer hover:opacity-80 dark:hover:brightness-125"
            />

            {/* Dropdown Menu */}
            {token && (
              <div className="group-hover:block  hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 border bg-transparent rounded">
                  <p className="cursor-pointer hover:text-green-700">
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("/orders")}
                    className="cursor-pointer  hover:text-green-700"
                  >
                    Orders
                  </p>
                  <p
                    onClick={logout}
                    className="cursor-pointer text-red-500 hover:text-red-800"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
          <Link to="/cart" className="relative">
            <CiShoppingCart className="w-[50px] cursor-pointer min-w-5" />

            <p className="absolute  right-[7px] bottom-[-5px]  text-center leading-4 aspect-square rounded-full font-extrabold text-[10px]">
              {getCartCount()}
            </p>
          </Link>
          <img
            onClick={() => setVisible(true)}
            src={menu_icon}
            className="w-5  sm:hidden"
            alt=""
          />

          {/* dark mode theme */}
          <button onClick={() => setDark(dark === "light" ? "dark" : "light")}>{dark === "light" ? "☀️" : "🌙"}</button>
        </div>

        {/* Sidebar menu for small screens */}
        <div
          className={`absolute top-0 right-0 bottom-0 overflow-hidden dark:text-white transition-all ${
            visible ? "w-full" : "w-0"
          }`}
        >
          <div className="flex flex-col dark:text-white">
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-3 cursor-pointer"
            >
              <img className="h-4 rotate-180" src={dropdown_icon} alt="" />
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
      </div>
    </div>
  );
};

export default Navbar;
