// components/OtpVerification.jsx
import React from "react";

const OtpVerification = ({ otp, handleChange, handleOtpVerify }) => (
  <div>
    <input
      type="text"
      name="otp"
      value={otp}
      onChange={handleChange}
      placeholder="Enter OTP"
      className="w-full mb-4 px-4 py-2 border rounded-md"
    />
    <button
      onClick={handleOtpVerify}
      className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
    >
      Verify OTP
    </button>
  </div>
);

export default OtpVerification;
