import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { SiKingstontechnology } from "react-icons/si";
import { BsDiscord } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 rounded-lg mb-2">
      <div className="max-w-7xl mx-auto px-6 flex justify-center items-center space-x-8">
        {/* GitHub */}
        <a
          href="https://github.com/ajey108"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition duration-300 text-2xl"
        >
          <FaGithub />
        </a>

        {/* LinkedIn */}
        <a
          href="https://github.com/ajey108"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition duration-300 text-2xl"
        >
          <FaLinkedinIn />
        </a>

        {/* Discord */}
        <a
          href="https://discord.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition duration-300 text-2xl"
        >
          <BsDiscord />
        </a>

        {/* Portfolio */}
        <a
          href="ajay108portfolio.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition duration-300 text-2xl"
        >
          <SiKingstontechnology />
        </a>
      </div>
      <div>
        <p className="text-center text-gray-400 mt-4">
          &copy; 2022 LapyE-Shop. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
