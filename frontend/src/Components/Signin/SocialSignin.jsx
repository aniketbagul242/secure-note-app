import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SocialSignin = ({ setToken, url, setMessage }) => {
  const navigate = useNavigate();

  const responseGoogle = async (response) => {
    try {
      if (response.code) {
        const result = await axios.get(
          `${url}/api/user/googleauth?code=${response.code}&mode=signin`
        );
        if (result.data.success) {
          setToken(result.data.token);
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("user", JSON.stringify(result.data.user));
          navigate("/dashboard");
        }
        setMessage(result.data.message);
      }
    } catch (error) {
      setMessage("Error during Google login.");
    }
  };

  const Logingoogle = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div className="mt-6">
      <button
        onClick={() => Logingoogle()}
        className="w-full flex items-center justify-center gap-3 bg-white text-black border border-gray-300 shadow-md rounded-md py-2 hover:bg-gray-100 transition"
      >
        <img src="google.png" alt="Google" className="w-5 h-5" />
        <span className="text-sm font-medium">Sign in with Google</span>
      </button>
    </div>
  );
};

export default SocialSignin;
