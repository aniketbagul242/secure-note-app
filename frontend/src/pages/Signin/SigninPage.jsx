
import React, { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import SigninForm from "../../Components/Signin/SigninForm";
import SocialSignin from "../../Components/Signin/SocialSignin";
import { Link } from "react-router-dom";
import { LogIn, ShieldCheck } from "lucide-react";

const SigninPage = () => {
  const { setToken, url } = useContext(StoreContext);
  const [message, setMessage] = useState("");

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600">
      {/* Left Section (Signin Form) */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="backdrop-blur-md bg-white/70 shadow-2xl rounded-2xl p-10 w-full max-w-md animate-fade-in">
          <div className="text-center mb-6">
            <div className="flex justify-center items-center gap-2">
              <LogIn className="w-8 h-8 text-indigo-600" />
              <span className="text-2xl font-bold text-indigo-700">HD</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">Sign In</h2>
            <p className="text-gray-600 text-sm">
              Welcome back! Login to continue 🚀
            </p>
          </div>

          {/* Normal Login Form */}
          <SigninForm setToken={setToken} url={url} setMessage={setMessage} />

          {/* Social Login */}
          <SocialSignin setToken={setToken} url={url} setMessage={setMessage} />

          {/* Global Message */}
          {message && (
            <p
              className={`text-sm text-center mt-4 ${
                message.toLowerCase().includes("error") ||
                message.toLowerCase().includes("failed") ||
                message.toLowerCase().includes("invalid")
                  ? "text-red-500"
                  : "text-blue-600"
              }`}
            >
              {message}
            </p>
          )}

          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-700 font-semibold hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section (Illustration with text) */}
      <div className="hidden md:flex md:w-1/2 h-screen items-center justify-center">
        <div className="text-white text-center px-10">
          <ShieldCheck className="w-20 h-20 mx-auto mb-6 animate-bounce" />
          <h2 className="text-4xl font-bold mb-4">Secure & Easy Login</h2>
          <p className="text-lg text-white/80">
            Access your account instantly with email or Google login.
            <br /> Your data stays safe 🔒
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
