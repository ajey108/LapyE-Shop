import { RiAdminFill } from "react-icons/ri";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center justify-between py-2 px-[4%]">
      <RiAdminFill /> <h1>AdminPannel</h1>
      <button
        onClick={() => setToken("")}
        className="bg-green-500 py-2 px-4 rounded text-black"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
