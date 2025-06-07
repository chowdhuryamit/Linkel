import React from "react";
import { useState } from "react";
import { logo,mobileMenuIcon,mobileMenuOverlay} from "../assets/index.js";

const LandingHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 p-4 md:px-8 bg-rose-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="logo" />
          <span className="text-4xl font-bold text-gray-900">
            <span className="text-blue-500">Li</span>
            <span className="text-pink-500">nk</span>
            <span className="text-green-500">el</span>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <a
            href="#home"
            className="text-gray-600 text-xl font-semibold hover:text-blue-700 transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="#features"
            className="text-gray-600 text-xl font-semibold hover:text-blue-700 transition-colors duration-200"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-gray-600 text-xl font-semibold hover:text-blue-700 transition-colors duration-200"
          >
            How It Works
          </a>
          <a
            href="#testimonials"
            className="text-gray-600 text-xl font-semibold hover:text-blue-700 transition-colors duration-200"
          >
            Testimonials
          </a>
          <a
            href="#contact"
            className="text-gray-600 text-xl font-semibold hover:text-blue-700 transition-colors duration-200"
          >
            Contact
          </a>
        </nav>

        {/* Call to Action Button */}
        <button className="hidden md:block bg-blue-700 text-white px-6 py-2 rounded-full shadow-lg hover:bg-blue-800 transition-colors duration-200 transform hover:scale-105">
          Sign Up
        </button>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-gray-600 hover:text-blue-600"
          onClick={toggleMobileMenu}
        >
          <img src={mobileMenuIcon} alt="mobile" className="h-8 w-8"/>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-75 z-20 transform ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg p-6">
          <div className="flex justify-end mb-8">
            <button
              className="text-gray-600 hover:text-gray-900"
              onClick={toggleMobileMenu}
            >
              <img src={mobileMenuOverlay} alt="mobile" className="h-8 w-8"/>
            </button>
          </div>
          <nav className="flex flex-col space-y-4">
            <a
              href="#home"
              className="text-gray-800 hover:text-blue-700 font-medium text-lg"
              onClick={toggleMobileMenu}
            >
              Home
            </a>
            <a
              href="#features"
              className="text-gray-800 hover:text-blue-700 font-medium text-lg"
              onClick={toggleMobileMenu}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-800 hover:text-blue-700 font-medium text-lg"
              onClick={toggleMobileMenu}
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-gray-800 hover:text-blue-700 font-medium text-lg"
              onClick={toggleMobileMenu}
            >
              Testimonials
            </a>
            <a
              href="#contact"
              className="text-gray-800 hover:text-blue-700 font-medium text-lg"
              onClick={toggleMobileMenu}
            >
              Contact
            </a>
          </nav>
          <button
            className="mt-8 w-full bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-800 transition-colors duration-200 transform hover:scale-105"
            onClick={toggleMobileMenu}
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
