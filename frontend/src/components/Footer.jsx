import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn ,FaGithub} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-black py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">
              We are dedicated to bringing you the best products and services. Join our community and stay updated with our latest offerings.
            </p>
          </div>

          {/* Links Section */}
          <div className='text-black'>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-black">About</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-black">Services</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-black">Contact</a></li>
              <li><a href="#privacy" className="text-gray-400 hover:text-black">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className='text-black'>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/ajey108" target="_blank" rel="noopener noreferrer">
                <FaGithub className="text-gray-400 hover:text-black text-xl" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-gray-400 hover:text-black text-xl" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-gray-400 hover:text-black text-xl" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn className="text-gray-400 hover:text-black text-xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-8 pt-4 text-center">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} ajey108. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
