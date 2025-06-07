import React from 'react'

const NewsletterSection = () => {
  return (
      <section id="contact" className="py-20 bg-gradient-to-br from-fuchsia-100 to-pink-100 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Illustration */}
        <div className="lg:w-1/2 flex justify-center lg:justify-start">
          <img
            src="https://placehold.co/500x400/FBCFE8/C026D3?text=Newsletter+Illustration"
            alt="Newsletter signup illustration"
            className="w-full max-w-md h-auto rounded-lg shadow-xl transform transition-transform duration-500 hover:scale-[1.01]"
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/500x400/FCE7F3/D8B4FE?text=Image+Load+Error"; }}
          />
        </div>

        {/* Right Content & Form */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Stay Up to Date
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-lg lg:ml-0 mx-auto">
            Subscribe to our newsletter to get the latest updates, news, and exclusive offers.
          </p>
          <form className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 max-w-md lg:mx-0 mx-auto">
            <div className="mb-6">
              <label htmlFor="fullName" className="sr-only">Full Name</label>
              <input
                type="text"
                id="fullName"
                placeholder="Full Name"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 transition-all duration-200"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="sr-only">Email Address</label>
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
       {/* Decorative blobs */}
       <div className="absolute top-0 left-0 w-28 h-28 bg-fuchsia-200 opacity-50 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
       <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-200 opacity-50 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
       <div className="absolute top-[30%] left-[20%] w-20 h-20 bg-rose-200 opacity-40 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-6000"></div>
    </section>
  )
}

export default NewsletterSection
