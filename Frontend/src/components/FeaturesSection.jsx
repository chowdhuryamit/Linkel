import React from "react";
import { features } from "../assets";
import Tilt from "react-parallax-tilt";

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-gray-300 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-12">
          Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Tilt>
              <div
                key={index}
                className={`p-8 rounded-xl shadow-lg border border-gray-300 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-110 hover:shadow-2xl ${feature.bgColor}`}
              >
                <div className="mb-4 p-4 bg-white rounded-full">
                  {feature.icon}
                </div>{" "}
                {/* Changed to bg-white for contrast */}
                <h3 className={`text-xl font-bold ${feature.textColor} mb-2`}>
                  {feature.title}
                </h3>
                <p className="text-gray-700">{feature.description}</p>{" "}
                {/* Adjusted text color for readability */}
              </div>
            </Tilt>
          ))}
        </div>
      </div>
      {/* Decorative blobs */}
    </section>
  );
};

export default FeaturesSection;
