import express from "express";
import googleAuth from "../controllers/googleAuthController.js";
import { forgotPassword,resetPassword } from "../controllers/passwordController.js";
import { loginUser,userRegister,verifyemail,} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", loginUser);
userRouter.post("/verifyemail", verifyemail);

//  Forgot password flow
userRouter.post("/forgot-password", forgotPassword);   // send OTP
userRouter.post("/reset-password", resetPassword);     // verify OTP + reset password

//  Google auth
userRouter.get("/googleauth", googleAuth);

export default userRouter;
