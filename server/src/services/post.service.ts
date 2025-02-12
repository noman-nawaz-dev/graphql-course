import mongoose from "mongoose";
import { BaseService } from "./BaseService";

export class PostService extends BaseService {
  static async getAllPosts() {
    return this.db?.collection("posts").find({}).toArray();
  }

  static async getPostById(id: string) {
    return this.db
      ?.collection("posts")
      .findOne({ _id: new mongoose.Types.ObjectId(id) });
  }

  static async getPostsByUserId(userId: string) {
    return this.db
      ?.collection("posts")
      .find({ user: new mongoose.Types.ObjectId(userId) })
      .toArray();
  }
}
