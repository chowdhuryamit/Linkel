import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans text-center">
      <h1 className="text-6xl font-extrabold text-red-500 mb-4 animate-bounce">404</h1>
      <p className="text-xl sm:text-2xl text-white mb-8 font-semibold">Page Not Found</p>
      <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <button
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 text-lg"
      onClick={()=>navigate('/home')}>
        Go to Home
      </button>
    </div>
  )
}

export default PageNotFound
