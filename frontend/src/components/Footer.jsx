import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { SiKingstontechnology } from "react-icons/si";
import { BsDiscord } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="dark:text-white border-2 py-4 rounded-lg mb-2">
      <div className="max-w-7xl mx-auto px-6 flex justify-center items-center space-x-8">
        {/* GitHub */}
        <a
          href="https://github.com/ajey108"
          target="_blank"
          rel="noopener noreferrer"
          className=" hover:text-blue-500 transition duration-300 text-2xl"
        >
          <FaGithub />
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/ajay-kumar-016b56242"
          target="_blank"
          rel="noopener noreferrer"
          className=" hover:text-blue-500 transition duration-300 text-2xl"
        >
          <FaLinkedinIn />
        </a>

        {/* Discord */}
        <a
          href="https://discord.com"
          target="_blank"
          rel="noopener noreferrer"
          className=" hover:text-blue-500 transition duration-300 text-2xl"
        >
          <BsDiscord />
        </a>

        {/* Portfolio */}
        <a
          href="https://ajay108portfolio.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className=" hover:text-blue-500 transition duration-300 text-2xl"
        >
          <SiKingstontechnology />
        </a>
      </div>
      <div>
        <p className="text-center mt-4">
          &copy; 2022 LapyE-Shop. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
