import React from "react";
import { steps } from "../assets";
import { Typewriter } from "react-simple-typewriter";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const HowItWorksSection = () => {
  return (
    <section
      id="how-it-works"
      className="py-20 bg-white relative"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-4 min-h-[2.5rem]">
          How it works
        </h2>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
          Discover how we make it easy for you to find your tribe & create
          meaningful relationships.
        </p>

        <VerticalTimeline lineColor="#3b82f6">
          {steps.map((step, index) => (
            <VerticalTimelineElement
              key={index}
              contentStyle={{ background: "transparent", boxShadow: "none" }}
              contentArrowStyle={{ display: "none" }}
              iconStyle={{
                background: "#ffffff",
                border: "2px solid #3b82f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "50px",
                height: "50px",
                marginLeft: "-25px",
                marginTop: "0",
              }}
              icon={
                <div style={{ fontSize: "24px", color: "#3b82f6" }}>
                  {step.icon}
                </div>
              }
            >
              <div
                className={`flex flex-col items-center p-8 rounded-xl shadow-lg border-2 border-gray-400 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-4 ${step.bgColor}`}
              >
                <div className="relative mb-6">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-700 font-extrabold text-xl border-2 border-blue-300">
                    {index + 1}
                  </div>
                  <div className="p-4 bg-gray-50 border-2 border-blue-700 rounded-full">
                    {step.icon}
                  </div>
                </div>
                <h3
                  className={`text-xl font-bold text-gray-900 mb-2 ${step.textColor}`}
                >
                  <Typewriter
                    words={[step.title,step.emoji]}
                    typeSpeed={100}
                    deleteSpeed={0}
                    delaySpeed={1000}
                    cursor={false}
                    loop={false}
                  />
                </h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default HowItWorksSection;
