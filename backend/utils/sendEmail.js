import { transporter } from "../config/emailconfig.js";


export const sendVerificationCode = async (email, verificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: '"NoteApp" <vickybagul58@gmail.com>', 
      to: email,
      subject: "Verify Your Email - TaskApp",
      text: `Your verification code is: ${verificationCode}`, // plain text
      html: `<h2>Email Verification</h2>
             <p>Your OTP code is:</p>
             <h3>${verificationCode}</h3>
             <p>This code will expire in 10 minutes.</p>`
    });

    console.log("✅ Email sent successfully:", response.messageId);
    return true;
  } catch (error) {
    console.error("❌ Email error:", error.message);
    return false;
  }
};
