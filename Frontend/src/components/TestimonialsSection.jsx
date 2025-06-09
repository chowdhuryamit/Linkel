import React from "react";
import { testimonials } from "../assets";
import Tilt from "react-parallax-tilt";
import { Typewriter } from "react-simple-typewriter";

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-gray-200 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-600 mb-12">
          What Our Users Say
          <Typewriter
            words={[" 😍 😍 😍"]}
            typeSpeed={100}
            deleteSpeed={0}
            delaySpeed={2000}
            cursor={false}
            loop={false}
          />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Tilt>
              <div
                key={index}
                className={`p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${testimonial.bgColor}`}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-24 h-24 rounded-full mb-6 object-cover border-2 border-gray-600 transform transition-transform duration-300 hover:scale-125"
                />
                <blockquote className="text-lg italic text-gray-800 mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <p className="font-bold text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-blue-700">{testimonial.role}</p>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
      {/* Decorative blobs */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-fuchsia-200 opacity-70 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      <div className="absolute bottom-10 left-5 w-24 h-24 bg-blue-200 opacity-70 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      <div className="absolute top-[40%] right-[20%] w-16 h-16 bg-purple-200 opacity-50 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
    </section>
  );
};

export default TestimonialsSection;
