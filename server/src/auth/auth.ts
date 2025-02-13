import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserService } from "../services/user.service";

export const getUserToken = async (email: string, password: string) => {
  const user = await UserService.getUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
};
