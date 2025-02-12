import { NavLink } from "react-router-dom";
import { MdAddCircle } from "react-icons/md";
import { FaRegListAlt } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa6";

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen w-64 fixed top-0 left-0 p-4 overflow-y-auto">
      <nav className="space-y-4">
        {/* Add Item */}
        <NavLink
          className="flex items-center gap-4 p-3 bg-gray-700 rounded-lg hover:bg-gray-900 transition-all duration-300"
          to="/add"
        >
          <MdAddCircle className="text-2xl" />
          <p className="text-sm">Add Items</p>
        </NavLink>

        {/* List Items */}
        <NavLink
          className="flex items-center gap-4 p-3 bg-gray-700 rounded-lg hover:bg-gray-900 transition-all duration-300"
          to="/list"
        >
          <FaRegListAlt className="text-2xl" />
          <p className="text-sm">List Items</p>
        </NavLink>

        {/* Order Items */}
        <NavLink
          className="flex items-center gap-4 p-3 bg-gray-700 rounded-lg hover:bg-gray-900 transition-all duration-300"
          to="/orders"
        >
          <FaCalendarCheck className="text-2xl" />
          <p className="text-sm">Order Items</p>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
