import mongoose from "mongoose";
import { BaseService } from "./BaseService";

export class UserService extends BaseService {
  static async getAllUsers() {
    return this.db?.collection("users").find({}).toArray();
  }

  static async getUserByEmail(email: string) {
    return this.db?.collection("users").findOne({ email });
  }

  static async getUserById(id: string) {
    return this.db
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
}
