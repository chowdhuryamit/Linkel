import React from "react";
import { helpItems, peopleInteraction } from "../assets/index.js";
import { Typewriter } from "react-simple-typewriter";

const HelpSection = () => {
  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-4">
          We're here to help you
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          Our platform is designed to make connecting with people easier and
          more enjoyable.
        </p>

        {/* Illustration of people interacting */}
        <div className="mb-16">
          <img
            src={peopleInteraction}
            alt="People interacting"
            className="mx-auto w-full max-w-4xl h-auto rounded-xl shadow-slate-600 shadow-2xl transform transition-transform duration-500 hover:scale-[1.11]"
          />
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {helpItems.map((item, index) => (
            <div
              key={index}
              className={`p-8 rounded-xl shadow-md border border-gray-100 flex flex-col items-center transform transition-all duration-300 hover:shadow-slate-600 hover:shadow-2xl hover:-translate-y-4 ${item.bgColor}`}
            >
              <div className="mb-4 p-3 bg-white rounded-full">{item.icon}</div>{" "}
              {/* Changed to bg-white for contrast */}
              <h3 className={`text-xl font-bold mb-2 ${item.textColor}`}>
                <Typewriter
                  words={[item.title]}
                  loop={false}
                  typeSpeed={150}
                  deleteSpeed={false}
                  delaySpeed={2000}
                />
              </h3>
              <p className="text-gray-500 font-semibold">{item.description}</p>{" "}
              {/* Adjusted text color for readability */}
            </div>
          ))}
        </div>
      </div>
      {/* Decorative blobs */}
      <div className="absolute top-10 left-5 w-20 h-20 bg-emerald-200 opacity-70 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-20 right-10 w-28 h-28 bg-fuchsia-200 opacity-70 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-6000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-200 opacity-50 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-1000"></div>
      <div className="absolute top-40 left-415-20 h-20 bg-emerald-200 opacity-70 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-10 right-20 w-28 h-28 bg-fuchsia-200 opacity-70 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-6000"></div>
      <div className="absolute top-1/3 left-1/5 w-16 h-16 bg-pink-200 opacity-50 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-1000"></div>
    </section>
  );
};

export default HelpSection;
