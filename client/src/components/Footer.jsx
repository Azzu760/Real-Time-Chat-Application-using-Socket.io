import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white/10 backdrop-blur-lg shadow-lg text-white py-8">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">WebChat</h2>
          <p className="text-gray-300 text-sm mt-2">
            Connect securely, chat freely.
          </p>
        </div>

        <nav className="mt-4 md:mt-0">
          <ul className="flex flex-wrap gap-6 text-gray-300 text-sm">
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex gap-4 mt-4 md:mt-0">
          <a
            href="#"
            className="p-2 bg-white/10 rounded-full hover:bg-blue-500 transition"
          >
            <FaFacebookF size={18} />
          </a>
          <a
            href="#"
            className="p-2 bg-white/10 rounded-full hover:bg-blue-500 transition"
          >
            <FaTwitter size={18} />
          </a>
          <a
            href="#"
            className="p-2 bg-white/10 rounded-full hover:bg-blue-500 transition"
          >
            <FaInstagram size={18} />
          </a>
          <a
            href="#"
            className="p-2 bg-white/10 rounded-full hover:bg-blue-500 transition"
          >
            <FaLinkedinIn size={18} />
          </a>
        </div>
      </div>

      <div className="text-center text-gray-400 text-sm mt-6 border-t border-gray-600 pt-4">
        © {new Date().getFullYear()} WebChat. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
