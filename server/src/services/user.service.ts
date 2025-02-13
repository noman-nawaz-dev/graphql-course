import mongoose from "mongoose";
import { BaseService } from "./BaseService";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

export class UserService extends BaseService {
  static async getAllUsers() {
    return this.db?.collection("users").find({}).toArray();
  }

  static async getUserByEmail(email: string) {
    return this.db?.collection("users").findOne({ email });
  }

  static async getUserById(id: string) {
    return await this.db
      ?.collection("users")
      .findOne({ _id: new mongoose.Types.ObjectId(id) });
  }

  static async getUserArrayByIds(userIds: string[] = []) {
    if (!userIds.length) return [];

    const objectIds = userIds.map((id) => new mongoose.Types.ObjectId(id));
    return this.db
      ?.collection("users")
      .find({ _id: { $in: objectIds } })
      .toArray();
  }

  static async updateUser(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    bio: string
  ) {
    const result = await this.db
      ?.collection("users")
      .updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        { $set: { firstName, lastName, email, bio } }
      );
    return result?.modifiedCount === 1;
  }

  static async getUserByToken(token: string) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    if (!decoded.userId) throw new Error("Invalid token");
    return this.getUserById(decoded.userId);
  }
}
