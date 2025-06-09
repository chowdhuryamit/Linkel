import React from "react";
import { friendShip } from "../assets";
import Tilt from "react-parallax-tilt";
import { Typewriter } from "react-simple-typewriter";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative pt-32 pb-16 md:pt-48 md:pb-24 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
            A Smarter Way to <br className="hidden sm:inline" />
            <span className="text-blue-500">
              <Typewriter
                words={[
                  "Form Friendships",
                  "Build Connections",
                  "Grow Together",
                  "Create Moments",
                  "Stay in Touch",
                ]}
                loop={false}
                cursor
                cursorStyle="_"
                typeSpeed={150}
                deleteSpeed={100}
                delaySpeed={2000}
              />
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Connect with like-minded individuals, build genuine relationships,
            and explore new experiences together.
          </p>
          <button className="bg-blue-700 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 duration-200">
            Explore Now
          </button>
        </div>

        {/* Right Illustration */}
        <div className="md:w-1/2 relative flex justify-center md:justify-end">
          {/* Placeholder for complex illustration */}
          <Tilt
            tiltMaxAngleX={40}
            tiltMaxAngleY={40}
            perspective={800}
            transitionSpeed={1500}
            scale={1.1}
            gyroscope={true}
          >
            <img
              src={friendShip}
              className="w-full max-w-lg md:max-w-full h-auto rounded-lg shadow-xl"
            />
          </Tilt>
          {/* Decorative blobs */}
          <div className="absolute -top-10 left-0 w-24 h-24 bg-blue-300 opacity-60 rounded-full mix-blend-multiply filter blur-xl animate-blob initial-bounce"></div>
          <div className="absolute bottom-5 right-5 w-32 h-32 bg-purple-300 opacity-60 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000 initial-bounce"></div>
          <div className="absolute top-1/4 left-[10%] w-20 h-20 bg-green-300 opacity-40 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-1/4 right-[10%] w-28 h-28 bg-yellow-300 opacity-40 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-6000"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
