import React from 'react'

const TestimonialsSection = () => {
    const testimonials = [
        {
          quote: "Friendify has completely changed my social life. I've met so many amazing people and found genuine connections. Highly recommend!",
          author: "Jane Doe",
          role: "Happy User",
          image: "https://placehold.co/100x100/A78BFA/FFFFFF?text=JD", // Placeholder for user image
          bgColor: "bg-pink-50"
        },
        {
          quote: "The best app for finding like-minded friends. The events feature is fantastic, and I love how easy it is to connect with people.",
          author: "John Smith",
          role: "Community Member",
          image: "https://placehold.co/100x100/60A5FA/FFFFFF?text=JS", // Placeholder for user image
          bgColor: "bg-teal-50"
        },
        {
          quote: "I was skeptical at first, but Friendify exceeded my expectations. I've found a fantastic group of friends to share my hobbies with.",
          author: "Emily White",
          role: "New Friend Finder",
          image: "https://placehold.co/100x100/F472B6/FFFFFF?text=EW", // Placeholder for user image
          bgColor: "bg-indigo-50"
        },
      ];
    
      return (
        <section id="testimonials" className="py-20 bg-gray-50 relative">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${testimonial.bgColor}`}
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-24 h-24 rounded-full mb-6 object-cover border-4 border-blue-400 transform transition-transform duration-300 hover:scale-110"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x100/CCCCCC/000000?text=Error"; }}
                  />
                  <blockquote className="text-lg italic text-gray-800 mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  <p className="font-bold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-blue-700">{testimonial.role}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Decorative blobs */}
          <div className="absolute top-10 right-10 w-20 h-20 bg-fuchsia-200 opacity-70 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute bottom-10 left-5 w-24 h-24 bg-blue-200 opacity-70 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          <div className="absolute top-[40%] right-[20%] w-16 h-16 bg-purple-200 opacity-50 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        </section>
    )
}

export default TestimonialsSection
