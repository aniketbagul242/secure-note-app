
import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
 import Message from "../../Components/Signup/Message"; 
 import OtpVerification from "../../Components/Signup/OtpVerification "; 
 import SignupForm from "../../Components/Signup/SignupForm";
import { UserPlus, Rocket, CheckCircle2, ShieldCheck } from "lucide-react";

const SignupPage = () => {
  const navigate = useNavigate();
  const { setToken, url } = useContext(StoreContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!formData.name.trim()) return setMessage("Full name is required.");
    if (!formData.email.includes("@"))
      return setMessage("Valid email required.");
    if (formData.password.length < 6)
      return setMessage("Password must be at least 6 characters.");
    if (formData.password !== formData.confirmPassword)
      return setMessage("Passwords do not match.");

    try {
      const res = await axios.post(`${url}/api/user/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (res.data.success) setShowOtpInput(true);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed.");
    }
    setLoading(false);
  };

  const handleOtpVerify = async () => {
    if (!formData.otp) return setMessage("Please enter OTP.");

    try {
      const res = await axios.post(`${url}/api/user/verifyemail`, {
        code: formData.otp,
        email: formData.email,
      });

      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
      }
      setMessage(res.data.message);
    } catch (err) {
      setMessage("OTP verification failed.");
    }
  };

  const responseGoogle = async (response) => {
  try {
    console.log("Google response:", response); // Debug

    if (response.code) {
      const res = await axios.get(
        `${url}/api/user/googleauth?code=${response.code}&mode=signup`
      );

      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
      } else {
        setMessage(res.data.message || "Google signup failed.");
      }
    } else {
      setMessage("No authorization code received from Google.");
    }
  } catch (err) {
    console.log("Google signup error:", err.response || err);
    setMessage("Google signup failed.");
  }
};


  const Logingoogle = useGoogleLogin({
  onSuccess: responseGoogle,
  onError: (err) => {
    console.log("Google login error:", err);
    setMessage("Google signup failed.");
  },
  flow: "auth-code",
});


  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      {/* Left Section (Form) */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md animate-fade-in">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-2">
              <UserPlus className="w-10 h-10 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              Create Your Account
            </h2>
            <p className="text-gray-500 text-sm">
              Sign up today and start organizing your notes 🚀
            </p>
          </div>

          <Message text={message} />

          {!showOtpInput ? (
            <SignupForm
              formData={formData}
              handleChange={handleChange}
              handleRegister={handleRegister}
              loading={loading}
              showOtpInput={showOtpInput}
            />
          ) : (
            <OtpVerification
              otp={formData.otp}
              handleChange={handleChange}
              handleOtpVerify={handleOtpVerify}
            />
          )}

          {/* Google Signup */}
          <button
            onClick={() => Logingoogle()}
            className="w-full mt-4 py-3 bg-gray-100 border rounded-lg flex items-center justify-center shadow-sm hover:bg-gray-200 transition"
          >
            <img src="/google.png" className="w-5 h-5 mr-2" alt="Google" />
            <span className="text-gray-700 font-medium">
              Continue with Google
            </span>
          </button>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-indigo-700 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section  */}
      <div className="hidden md:flex md:w-1/2 h-screen items-center justify-center text-white px-12 animate-fade-in">
        <div className="space-y-6 max-w-md">
          <h1 className="text-4xl font-bold leading-snug">
            Welcome to <span className="text-yellow-300">NoteApp</span>
          </h1>
          <p className="text-lg text-gray-100">
            The simplest way to create, organize, and access your notes from
            anywhere.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-green-400" />
              <span>Secure signup with Email & OTP</span>
            </li>
            <li className="flex items-center gap-3">
              <Rocket className="w-6 h-6 text-pink-300" />
              <span>Quick access with Google Authentication</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-blue-300" />
              <span>Organize your notes efficiently</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
