
import React from "react";

const SignupForm = ({ formData, handleChange, handleRegister, loading, showOtpInput }) => {
  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full mb-4 px-4 py-2 border rounded-md"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full mb-4 px-4 py-2 border rounded-md"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        className="w-full mb-4 px-4 py-2 border rounded-md"
        required
      />
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
        className="w-full mb-4 px-4 py-2 border rounded-md"
        required
      />

      {!showOtpInput && (
        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2 rounded-md transition ${
            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Sending OTP..." : "Get OTP"}
        </button>
      )}
    </form>
  );
};

export default SignupForm;
