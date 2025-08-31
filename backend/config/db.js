import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const url = process.env.MONGODB_URI;

const connectDb = async ()=>{
  try {
    await mongoose.connect(url)
    console.log("connect db");
    
  } catch (error) {
    console.log(error);
    
  }
}

export default connectDb;