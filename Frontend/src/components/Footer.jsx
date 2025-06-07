import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 md:px-8 rounded-t-lg shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Company Info / Logo */}
        <div className="col-span-full md:col-span-1">
          <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
            <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"></path>
            </svg>
            <span className="text-xl font-bold text-white">Friendify</span>
          </div>
          <p className="text-center md:text-left text-gray-400">
            &copy; 2025 Friendify. All Rights Reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#about" className="text-gray-400 hover:text-blue-500 transition-colors duration-200">About Us</a></li>
            <li><a href="#services" className="text-gray-400 hover:text-blue-500 transition-colors duration-200">Services</a></li>
            <li><a href="#blog" className="text-gray-400 hover:text-blue-500 transition-colors duration-200">Blog</a></li>
            <li><a href="#careers" className="text-gray-400 hover:text-blue-500 transition-colors duration-200">Careers</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><a href="#privacy" className="text-gray-400 hover:text-blue-500 transition-colors duration-200">Privacy Policy</a></li>
            <li><a href="#terms" className="text-gray-400 hover:text-blue-500 transition-colors duration-200">Terms of Service</a></li>
            <li><a href="#cookie" className="text-gray-400 hover:text-blue-500 transition-colors duration-200">Cookie Policy</a></li>
          </ul>
        </div>

        {/* Contact Info / Socials */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-2">
            <li><a href="mailto:info@friendify.com" className="text-gray-400 hover:text-blue-500 transition-colors duration-200">info@friendify.com</a></li>
            <li><a href="tel:+1234567890" className="text-gray-400 hover:text-blue-500 transition-colors duration-200">+1 (234) 567-890</a></li>
            <li className="flex space-x-4 mt-4">
              <a href="https://facebook.com" aria-label="Facebook" className="text-gray-400 hover:text-blue-500 transition-colors duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.04c-5.46 0-9.92 4.46-9.92 9.92 0 4.39 3.19 8.08 7.41 8.82V14.1h-2.5v-2.1h2.5V9.41c0-2.45 1.49-3.79 3.68-3.79 1.05 0 1.96.08 2.22.12v2.24h-1.35c-1.07 0-1.28.51-1.28 1.26v1.65h2.51l-.41 2.1h-2.1v5.77c4.22-.74 7.41-4.43 7.41-8.82 0-5.46-4.46-9.92-9.92-9.92z"/>
                </svg>
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="text-gray-400 hover:text-blue-500 transition-colors duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 4.09c-.83.37-1.74.62-2.67.73.96-.58 1.7-1.5 2.05-2.58-.9.53-1.9.92-2.93 1.13-1.63-1.73-4.41-2.28-6.17-1.12-2.03 1.34-2.88 3.96-1.96 6.13-3.6-.18-6.78-1.9-8.91-4.59-.39.67-.62 1.45-.62 2.27 0 1.57.8 2.97 2.02 3.79-.74-.02-1.44-.23-2.05-.56v.03c0 2.18 1.55 4 3.6 4.43-.37.1-.76.15-1.16.15-.28 0-.55-.03-.81-.08.57 1.79 2.23 3.09 4.19 3.12-1.54 1.21-3.48 1.93-5.59 1.93-.36 0-.71-.02-1.05-.07 1.99 1.28 4.35 2.03 6.9 2.03 8.27 0 12.06-6.83 12.06-12.72 0-.19-.01-.38-.01-.57.83-.6 1.55-1.35 2.12-2.2z"/>
                </svg>
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="text-gray-400 hover:text-blue-500 transition-colors duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.04c-3.19 0-3.66.01-4.94.07-.63.03-1.05.15-1.41.3-.39.16-.76.38-1.1.72-.34.34-.56.71-.72 1.1-.15.36-.27.78-.3 1.41-.06 1.28-.07 1.75-.07 4.94s.01 3.66.07 4.94c.03.63.15 1.05.3 1.41.16.39.38.76.72 1.1.34.34.71.56 1.1.72.36.15.78.27 1.41.3 1.28.06 1.75.07 4.94.07s3.66-.01 4.94-.07c.63-.03 1.05-.15 1.41-.3.39-.16.76-.38 1.1-.72.34-.34.56-.71.72-1.1.15-.36.27-.78.3-1.41.06-1.28.07-1.75.07-4.94s-.01-3.66-.07-4.94c-.03-.63-.14-.92-.27-1.24-.14-.35-.34-.65-.59-.9-.25-.25-.45-.55-.9-.59-.32-.13-.67-.24-1.24-.27-1.28-.06-1.75-.07-4.94-.07zM12 2.04c3.19 0 3.66.01 4.94.07.57.03.92.14 1.24.27.35.14.65.34.9.59.25.25.45.55.59.9.13.32.24.67.27 1.24.06 1.28.07 1.75.07 4.94s-.01 3.66-.07 4.94c-.03.57-.14.92-.27 1.24-.14.35-.34.65-.59.9-.25.25-.45.55-.9.59-.32.13-.67.24-1.24.27-1.28.06-1.75.07-4.94.07s-3.66-.01-4.94-.07c-.57-.03-.92-.14-1.24-.27-.35-.14-.65-.34-.9-.59-.25-.25-.45-.55-.59-.9-.13-.32-.24-.67-.27-1.24-.06-1.28-.07-1.75-.07-4.94s.01-3.66.07-4.94c.03-.57.14-.92.27-1.24.14-.35.34-.65.59-.9.25-.25.45-.55.9-.59.32-.13.67-.24 1.24-.27 1.28-.06 1.75-.07 4.94-.07zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>  
  )
}

export default Footer
