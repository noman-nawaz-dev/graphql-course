import mongoose from "mongoose";
import { BaseService } from "./BaseService";
import { UserService } from "./user.service";
import { CreateCommentInput } from "../graphql/generated/types";

export class CommentService extends BaseService {
  static async getCommentsByPostId(postId: string) {
    return this.db
      ?.collection("comments")
      .find({ post: new mongoose.Types.ObjectId(postId) })
      .toArray();
  }

  static async createComment(input: CreateCommentInput): Promise<boolean> {
    try {
      const result = await this.db?.collection("comments").insertOne({
        post: new mongoose.Types.ObjectId(input.post),
        user: await UserService.getUserById(input.user),
        description: input.description,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return !!result?.acknowledged;
    } catch (error) {
      console.error("Error creating comment:", error);
      return false;
    }
  }

  static async getCommentNotificationData(
    input: CreateCommentInput
  ): Promise<any> {
    try {
      // Get user info for the notification
      const user = await UserService.getUserById(input.user);

      // Return simple notification data
      return {
        description: input.description,
        user: {
          firstName: user?.firstName,
          lastName: user?.lastName,
        },
        postId: input.post,
      };
    } catch (error) {
      console.error("Error creating comment notification data:", error);
      return null;
    }
  }
}
