import jwt from "jsonwebtoken";

// ===============================
// JWT Token Generator
// ===============================
export const CreateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN, { expiresIn: "7d" });
};
