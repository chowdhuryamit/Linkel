import React, { useEffect, useState } from "react"
import { signInWithPopup } from "firebase/auth"
import { auth,provider } from "../service/firebase"
import axios from 'axios'
import {toast} from 'react-toastify'

function Signup() {
  const [formVisible, setFormVisible] = useState(false);
  const [state, setState] = useState("signup");

  const handleGoogleOauth=async ()=>{
    try {
      const result=await signInWithPopup(auth,provider);
      const idToken =await result.user.getIdToken();
      const res=await axios.post('http://localhost:8000/api/u1/verify/signup/credentials',{idToken},{withCredentials:true})
      if(res.data.success){
        toast.success(res.data.message);
        console.log(res);
      }
      else{
        toast.error(res.message);
        console.log(res);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }

  useEffect(() => {
    setFormVisible(true);
  }, []);

  return (
    <div
      className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden animate-gradient-shift"
      style={{
        backgroundImage: "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
      }}
    >
      <div
        className={`relative z-10 bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-xl w-full max-w-sm sm:max-w-md lg:max-w-lg transition-all duration-700 ease-out transform ${formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4">
          {state === "signup" ? "Create an Account" : "Login to Your Account"}
        </h1>
        <p className="text-sm text-center text-gray-600 mb-6">
          {state === "signup"
            ? "Sign up with your social media account or email address"
            : "Sign in with your social media account or email address"}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <button className="flex items-center justify-center w-full px-4 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition-transform duration-300 ease-in-out hover:scale-105">
            Facebook
          </button>
          <button className="flex items-center justify-center w-full px-4 py-2 sm:py-2.5 bg-blue-400 hover:bg-blue-500 text-white font-medium rounded-md shadow-sm transition-transform duration-300 ease-in-out hover:scale-105">
            Twitter
          </button>
          <button className="flex items-center justify-center w-full px-4 py-2 sm:py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md shadow-sm transition-transform duration-300 ease-in-out hover:scale-105" onClick={handleGoogleOauth}>
            Google
          </button>
        </div>

        <div className="relative flex items-center justify-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <form className="space-y-4">
          <div>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
              aria-label="Username"
              required
            />
          </div>
          <div>
            {state === "signup" && (
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                aria-label="Email Address"
                required
              />
            )}
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
              aria-label="Password"
              required
            />
          </div>
          <div>
            {state === "signup" && (
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                placeholder="Confirm Password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                aria-label="Confirm Password"
                required
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-md shadow-md transition-transform duration-150 ease-in-out hover:scale-105"
          >
            {state === "signup" ? "Sign Up" : "Login"}
          </button>
          {state === "signup" ? (
            <button
              type="button"
              className="text-blue-600 text-sm mt-2 block w-full text-center hover:underline"
              onClick={() => setState("signin")}
            >
              Already have an Account?
            </button>
          ) : (
            <button
              type="button"
              className="text-blue-600 text-sm mt-2 block w-full text-center hover:underline"
              onClick={() => setState("signup")}
            >
              Create a new Account
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Signup;
