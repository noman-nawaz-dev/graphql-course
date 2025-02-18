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

  static async deletePost(id: string, userId: string): Promise<boolean> {
    const result = await this.db?.collection("posts").deleteOne({
      _id: new mongoose.Types.ObjectId(id),
      user: new mongoose.Types.ObjectId(userId),
    });
    console.log(result);
    return (result?.deletedCount ?? 0) > 0;
  }
}
