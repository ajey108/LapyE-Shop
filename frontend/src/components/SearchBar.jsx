import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  }, [location, setShowSearch]);

  return showSearch ? (
    <div className="w-full max-w-md mx-auto mt-4 mb-4">
      <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full shadow px-4 py-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search here..."
          className="flex-1 bg-transparent border-none outline-none text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 px-2"
        />
        <button
          type="button"
          onClick={() => setShowSearch(false)}
          className="ml-2 text-gray-400 hover:text-red-500 transition"
          aria-label="Close search"
        >
          <RxCross2 className="text-2xl" />
        </button>
      </div>
    </div>
  ) : null;
};

export default SearchBar;
