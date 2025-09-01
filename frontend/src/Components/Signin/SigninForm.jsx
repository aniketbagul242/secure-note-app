import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SigninForm = ({ setToken, url, setMessage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [forgotMode, setForgotMode] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  // Normal login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${url}/api/user/login`, { email, password });
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setToken(res.data.token);
        navigate("/dashboard");
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed.");
    }
    setLoading(false);
  };

  // Forgot password - send OTP
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${url}/api/user/forgot-password`, { email });
      if (res.data.success) {
        setMessage("OTP sent to your email.");
        setOtpSent(true);
      } else {
        setMessage(res.data.message);
      }
    } catch {
      setMessage("Error sending OTP.");
    }
    setLoading(false);
  };

  // Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${url}/api/user/reset-password`, {
        email,
        otp,
        newPassword,
      });
      if (res.data.success) {
        setMessage("Password reset successful. Please login.");
        setForgotMode(false);
        setOtpSent(false);
        setPassword("");
      } else {
        setMessage(res.data.message);
      }
    } catch {
      setMessage("Error resetting password.");
    }
    setLoading(false);
  };

  return (
    <>
      {!forgotMode ? (
        <form onSubmit={handleLogin}>
          <label className="block mb-1 text-sm text-gray-700">Email</label>
          <input
            type="email"
            required
            className="w-full px-4 py-2 mb-4 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="block mb-1 text-sm text-gray-700">Password</label>
          <input
            type="password"
            required
            className="w-full px-4 py-2 mb-4 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-2 rounded-md ${
              loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p
            onClick={() => setForgotMode(true)}
            className="text-sm text-blue-500 text-center mt-2 cursor-pointer hover:underline"
          >
            Forgot password?
          </p>

          <p className="text-sm text-center text-gray-500 mt-2">
            Don’t have an account?{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Create one
            </Link>
          </p>
        </form>
      ) : !otpSent ? (
        // Forgot password - send OTP form
        <form onSubmit={handleForgotPassword}>
          <label className="block mb-1 text-sm text-gray-700">Email</label>
          <input
            type="email"
            required
            className="w-full px-4 py-2 mb-4 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      ) : (
        // Reset password form
        <form onSubmit={handleResetPassword}>
          <label className="block mb-1 text-sm text-gray-700">OTP</label>
          <input
            type="text"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 border rounded-md mb-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter OTP"
          />

          <label className="block mb-1 text-sm text-gray-700">New Password</label>
          <input
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md mb-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter new password"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}
    </>
  );
};

export default SigninForm;

