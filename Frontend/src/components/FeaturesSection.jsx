import React from 'react'

const FeaturesSection = () => {
    const features = [
        {
          icon: (
            <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V2zm-2 12H6V6h12v8z" />
            </svg>
          ),
          title: "Seamless Messaging",
          description: "Chat instantly and securely with your new connections.",
          bgColor: "bg-blue-50"
        },
        {
          icon: (
            <svg className="w-12 h-12 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
            </svg>
          ),
          title: "Event Planning",
          description: "Organize and join local events with your community.",
          bgColor: "bg-emerald-50"
        },
        {
          icon: (
            <svg className="w-12 h-12 text-rose-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
            </svg>
          ),
          title: "Location-Based Matching",
          description: "Discover friends nearby who share your interests.",
          bgColor: "bg-rose-50"
        },
        {
          icon: (
            <svg className="w-12 h-12 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          ),
          title: "Personalized Profiles",
          description: "Showcase your personality and what makes you unique.",
          bgColor: "bg-amber-50"
        },
        {
          icon: (
            <svg className="w-12 h-12 text-violet-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 6v10.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5h2v5.5c0 1.1.9 2 2 2s2-.9 2-2V6h2zm-4 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          ),
          title: "Interest Groups",
          description: "Join communities based on your hobbies and passions.",
          bgColor: "bg-violet-50"
        },
        {
          icon: (
            <svg className="w-12 h-12 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 19c-3.87 0-7-3.13-7-7V6.39l7-3.11 7 3.11V13c0 3.87-3.13 7-7 7zm0-14.5L7.5 8.5 9 10l3-3 5.5 5.5 1.5-1.5L12 5.5z" />
            </svg>
          ),
          title: "Privacy & Security",
          description: "Your data and interactions are kept safe and secure.",
          bgColor: "bg-teal-50"
        },
      ];
    
      return (
        <section id="features" className="py-20 bg-gray-100 relative">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12">
              Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${feature.bgColor}`}
                >
                  <div className="mb-4 p-4 bg-white rounded-full">{feature.icon}</div> {/* Changed to bg-white for contrast */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p> {/* Adjusted text color for readability */}
                </div>
              ))}
            </div>
          </div>
           {/* Decorative blobs */}
           <div className="absolute -top-10 right-0 w-24 h-24 bg-rose-200 opacity-60 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
           <div className="absolute bottom-0 left-10 w-32 h-32 bg-amber-200 opacity-60 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-3000"></div>
           <div className="absolute top-[20%] right-[5%] w-16 h-16 bg-teal-200 opacity-40 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-5000"></div>
           <div className="absolute bottom-[20%] left-[5%] w-20 h-20 bg-violet-200 opacity-40 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-7000"></div>
        </section>
      )
}

export default FeaturesSection
