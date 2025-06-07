import React from "react";
import {
  HeroSection,
  FeaturesSection,
  Footer,
  HelpSection,
  HowItWorksSection,
  LandingHeader,
  NewsletterSection,
  TestimonialsSection,
} from "../components/index.js";

const Landing = () => {
  return (
    <div>
      <div className="font-inter antialiased text-gray-800 bg-gray-50">
        {/* Header Section */}
        <LandingHeader />

        {/* Hero Section */}
        <HeroSection />

        {/* Help Section */}
        <HelpSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Newsletter Section */}
        <NewsletterSection />

        {/* Footer Section */}
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
