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
    <div className="border-t border-b bg-gray-50 text-center cursor-pointer w-[300px] rounded-full mb-2 ">
      <div className="inline-flex items-center justify-center border-gray-400 px-5">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search here..."
          className="w-6/12 bg-gray-50 border-0  outline-none"
        />
        <RxCross2
          className="text-2xl text-gray-400 cursor-pointer"
          onClick={() => setShowSearch(false)} // Closing the search when clicked
        />
      </div>
    </div>
  ) : null;
};

export default SearchBar;
