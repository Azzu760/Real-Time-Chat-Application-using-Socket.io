import React from "react";
import { Link } from "react-router-dom";
import { FiLogIn, FiUserPlus } from "react-icons/fi";

const Navbar = () => {
  return (
    <nav className="fixed w-full bg-transparent backdrop-blur-sm z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer">
            <span className="text-2xl font-bold text-white">WebChat</span>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="flex items-center px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-300"
            >
              <FiLogIn className="mr-2" />
              Login
            </Link>

            <Link
              to="/register"
              className="flex items-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-300"
            >
              <FiUserPlus className="mr-2" />
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
