import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {   
    type: String,
    
  },

  isVerified: {
    type: Boolean,
    default: false
  },

  verificationCode: {
    type: String
  },

  googleId: {
    type: String,
    default: null
  }
}, { timestamps: true });

const userModel = mongoose.model("User", userSchema);

export default userModel;