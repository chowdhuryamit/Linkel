import React from "react";
import { newsLatter } from "../assets";
import Tilt from "react-parallax-tilt";

const NewsletterSection = () => {
  return (
    <section id="contact" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Illustration */}
        <div className="lg:w-1/2 flex justify-center lg:justify-start">
          <Tilt
            tiltMaxAngleX={40}
            tiltMaxAngleY={40}
            perspective={800}
            transitionSpeed={1500}
            scale={1.1}
            gyroscope={true}
          >
            <img
              src={newsLatter}
              alt="Newsletter signup illustration"
              className="w-full max-w-md h-auto rounded-lg  transform transition-transform duration-500 hover:scale-[1.11] hover:shadow-2xl hover:shadow-gray-600"
            />
          </Tilt>
        </div>

        {/* Right Content & Form */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-4">
            Stay Up to Date
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-lg lg:ml-0 mx-auto">
            Subscribe to our newsletter to get the latest updates, news, and
            exclusive offers.
          </p>
          <form className="bg-white p-8 rounded-xl shadow-2xl shadow-gray-700 border border-gray-300 max-w-md lg:mx-0 mx-auto">
            <div className="mb-6">
              <label htmlFor="fullName" className="sr-only">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Full Name"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 transition-all duration-200"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="sr-only">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 transition-all duration-200"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-800 transition-colors duration-200 transform hover:scale-105"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
