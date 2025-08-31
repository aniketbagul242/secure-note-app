import axios from "axios";
import { oauth2Client } from "../utils/config.js";
import { CreateToken } from "../utils/token.js";
import userModel from "../model/userModel.js";

// ===============================
// Google Auth (Signup & Signin)
// ===============================
const googleAuth = async (req, res) => {
  try {
    const { code, mode } = req.query;

    if (!code) {
      return res.status(400).json({ success: false, message: "Missing Google authorization code." });
    }

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Fetch user info from Google
    let userRes;
    try {
      userRes = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.access_token}`
      );
    } catch (err) {
      console.error("Failed to fetch Google user info:", err.response?.data || err.message);
      return res.status(500).json({ success: false, message: "Failed to fetch Google user info." });
    }

    const { name, email, sub: googleId } = userRes.data;

    // Check if user already exists
    let user = await userModel.findOne({ email });

    if (mode === "signup") {
      if (user) {
        if (user.googleId) {
          // Already signed up via Google → auto-login
          const token = CreateToken(user._id);
          return res.status(200).json({
            success: true,
            message: "User already exists. Logged in via Google.",
            user: { name: user.name, email: user.email },
            token,
          });
        } else {
          // Email exists but not via Google
          return res.status(400).json({
            success: false,
            message: "Email already exists. Please log in using your password.",
          });
        }
      }

      // First-time Google signup → create user
      user = new userModel({
        name,
        email,
        googleId,
        isVerified: true,
      });
      await user.save();

      const token = CreateToken(user._id);
      return res.status(201).json({
        success: true,
        message: "Signup successful",
        user: { name: user.name, email: user.email },
        token,
      });
    }

    if (mode === "signin") {
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "No account found. Please sign up using Google.",
        });
      }

      if (!user.googleId || user.googleId !== googleId) {
        return res.status(401).json({
          success: false,
          message: "Google account mismatch. Use the correct account.",
        });
      }

      // Successful login
      const token = CreateToken(user._id);
      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: { name: user.name, email: user.email },
        token,
      });
    }

    return res.status(400).json({ success: false, message: "Invalid mode." });

  } catch (error) {
    console.error("Google Auth Error:", error.message);
    return res.status(500).json({ success: false, message: "Something went wrong during Google authentication." });
  }
};

export default googleAuth;
