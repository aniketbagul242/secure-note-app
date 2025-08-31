import { sendVerificationCode } from "../utils/sendEmail.js";
import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";

// ===============================
// Forgot Password - Send OTP
// ===============================
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = verificationCode;
    await user.save();

    await sendVerificationCode(email, verificationCode);

    return res.json({ success: true, message: "OTP sent to email" });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.json({ success: false, message: "Internal server error" });
  }
};


// ===============================
// Reset Password (with OTP)
// ===============================
 const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.json({ success: false, message: "All fields required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.verificationCode !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    user.password = await bcrypt.hash(newPassword, 1);
    user.verificationCode = null;
    await user.save();

    return res.json({ success: true, message: "Password reset successful" });

  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.json({ success: false, message: "Internal server error" });
  }
};


export {forgotPassword,resetPassword}
