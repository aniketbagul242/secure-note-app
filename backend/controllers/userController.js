// ===============================
//  Authentication Controller
//  Handles Signup, Login,
// ===============================
import { sendVerificationCode } from "../utils/sendEmail.js";
import validator from "validator";
import userModel from "../model/userModel.js";
import { CreateToken } from "../utils/token.js";
import bcrypt from "bcryptjs";


// ===============================
// Signup (with OTP verification)
// ===============================
const userRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }

    // Check if already exists
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.json({ success: false, message: "User Already Exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 1);

    // Generate OTP
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Send OTP to email
    await sendVerificationCode(email, verificationCode);

    // Store user data temporarily in server memory (or Redis)
    global.tempUsers = global.tempUsers || {};
    global.tempUsers[email] = { name, email, password: hashedPassword, verificationCode };

    return res.json({
      success: true,
      message: "OTP sent to your email. Please verify."
    });

  } catch (error) {
    console.error("Register Error:", error);
    return res.json({ success: false, message: "Internal server error" });
  }
};


// ===============================
// Login (Email + Password)
// ===============================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "Email and password required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    if (!user.isVerified) {
      return res.json({ success: false, message: "Please verify your email first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = CreateToken(user._id);

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.json({ success: false, message: "Internal server error" });
  }
};


// ===============================
// Verify Email (for Signup only)
// ===============================
const verifyemail = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.json({ success: false, message: "Email and OTP required" });
    }

    const tempUser = global.tempUsers?.[email];
    if (!tempUser) {
      return res.json({ success: false, message: "No OTP request found for this email" });
    }

    if (tempUser.verificationCode !== code) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    const newUser = new userModel({
      name: tempUser.name,
      email: tempUser.email,
      password: tempUser.password,
      isVerified: true
    });
    await newUser.save();

    delete global.tempUsers[email];

    const token = CreateToken(newUser._id);

    return res.json({
      success: true,
      message: "Email verified and user created successfully",
      token,
      user: { name: newUser.name, email: newUser.email }
    });

  } catch (error) {
    console.error("Verify Email Error:", error);
    return res.json({ success: false, message: "Internal server error" });
  }
};


export {userRegister, loginUser, verifyemail};
