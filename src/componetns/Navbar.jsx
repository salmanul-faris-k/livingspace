import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { IoMenu, IoClose } from 'react-icons/io5';
import LOGO from "../assets/LOGOcroped.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#282828]/80 backdrop-blur-md shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex w-36 h-12 items-center">
            <img src={LOGO} className="w-full h-full object-contain" alt="Logo" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-green-300 font-medium transition-colors duration-300">Home</a>
            <a href="#" className="text-white hover:text-green-300 font-medium transition-colors duration-300">Calculator</a>
            <a href="#" className="text-white hover:text-green-300 font-medium transition-colors duration-300">Projects</a>
            <a href="#" className="text-white hover:text-green-300 font-medium transition-colors duration-300">Contact</a>
          </div>

          {/* User Icon */}
          <div className="hidden md:block">
            <FaUserCircle className="w-8 h-8 text-white cursor-pointer hover:text-green-300 transition-colors duration-300" />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none transition-transform duration-300"
            >
              {isOpen ? (
                <IoClose className="w-7 h-7 transform rotate-90 transition-transform duration-300" />
              ) : (
                <IoMenu className="w-7 h-7 transform transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown with smooth animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-[#282828]/95 backdrop-blur-md shadow-lg`}
      >
        <div className="px-4 pt-4 pb-3 space-y-3">
          <a href="#" className="block text-white hover:text-green-300 font-medium transition-colors duration-300">Home</a>
          <a href="#" className="block text-white hover:text-green-300 font-medium transition-colors duration-300">Calculator</a>
          <a href="#" className="block text-white hover:text-green-300 font-medium transition-colors duration-300">Projects</a>
          <a href="#" className="block text-white hover:text-green-300 font-medium transition-colors duration-300">Contact</a>
          <div className="pt-3 border-t border-green-600">
            <FaUserCircle className="w-8 h-8 text-white cursor-pointer hover:text-green-300 transition-colors duration-300" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
