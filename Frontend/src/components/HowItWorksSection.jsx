import React from 'react'

const HowItWorksSection = () => {
    const steps = [
        {
          icon: (
            <svg className="w-12 h-12 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9v-2h2v2zm-2.73-4.36L7.1 11.23l1.41-1.41 2.12 2.12L16.27 8l1.41 1.41-5.65 5.65-2.82-2.82z" />
            </svg>
          ),
          title: "Sign Up",
          description: "Create your free account in minutes.",
          bgColor: "bg-sky-50"
        },
        {
          icon: (
            <svg className="w-12 h-12 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9H9V7h2v2zm0 4h-2v2h2v-2zm4-4h-2V7h2v2zm0 4h-2v2h2v-2z" />
            </svg>
          ),
          title: "Build Your Profile",
          description: "Tell us about your interests and preferences.",
          bgColor: "bg-emerald-50"
        },
        {
          icon: (
            <svg className="w-12 h-12 text-fuchsia-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z" />
            </svg>
          ),
          title: "Discover Matches",
          description: "Our smart algorithm suggests compatible friends.",
          bgColor: "bg-fuchsia-50"
        },
        {
          icon: (
            <svg className="w-12 h-12 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9h2v2h-2v-2zm-2 0h-2v2h2v-2zm6 0h2v2h-2v-2zm2 0h2v2h-2v-2z" />
            </svg>
          ),
          title: "Connect & Chat",
          description: "Reach out and start conversations easily.",
          bgColor: "bg-orange-50"
        },
        {
          icon: (
            <svg className="w-12 h-12 text-red-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9h2v2h-2v-2zm-2 0h-2v2h2v-2zm6 0h2v2h-2v-2zm2 0h2v2h-2v-2z" />
            </svg>
          ),
          title: "Plan Activities",
          description: "Organize meetups and explore shared interests.",
          bgColor: "bg-red-50"
        },
        {
          icon: (
            <svg className="w-12 h-12 text-teal-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 19c-3.87 0-7-3.13-7-7V6.39l7-3.11 7 3.11V13c0 3.87-3.13 7-7 7zm0-14.5L7.5 8.5 9 10l3-3 5.5 5.5 1.5-1.5L12 5.5z" />
            </svg>
          ),
          title: "Build Friendships",
          description: "Enjoy lasting connections and new experiences.",
          bgColor: "bg-teal-50"
        },
      ];
    
      return (
        <section id="how-it-works" className="py-20 bg-gradient-to-br from-sky-100 to-lime-100 relative">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
              Discover how we make it easy for you to find your tribe & create meaningful relationships.
            </p>
    
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={index} className={`flex flex-col items-center p-8 rounded-xl shadow-lg border border-gray-100 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${step.bgColor}`}>
                  <div className="relative mb-6">
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-700 font-extrabold text-xl"> {/* Changed to bg-white for contrast */}
                      {index + 1}
                    </div>
                    <div className="p-4 bg-gray-50 rounded-full">{step.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-700">{step.description}</p> {/* Adjusted text color for readability */}
                </div>
              ))}
            </div>
          </div>
          {/* Decorative blobs */}
          <div className="absolute top-10 left-1/4 w-28 h-28 bg-sky-300 opacity-60 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-1000"></div>
          <div className="absolute bottom-20 right-1/4 w-20 h-20 bg-lime-300 opacity-60 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-5000"></div>
          <div className="absolute top-[60%] left-[10%] w-24 h-24 bg-orange-200 opacity-40 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-3000"></div>
        </section>
      )
}

export default HowItWorksSection
