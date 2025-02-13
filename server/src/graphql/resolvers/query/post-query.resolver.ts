import { PostService } from "../../../services/post.service";
import { UserService } from "../../../services/user.service";
import { CommentService } from "../../../services/comment.service";

export class PostQueryResolver {
  static async getAllPosts(_: any, __: any, { user }: { user: any }) {
    return PostService.getAllPosts();
  }

  static async getPost(_: any, { id }: { id: string }) {
    return PostService.getPostById(id);
  }

  static async user(parent: any) {
    return UserService.getUserById(parent.user);
  }

  static async likes(parent: any) {
    return UserService.getUserArrayByIds(parent.likes);
  }

  static async disLikes(parent: any) {
    return UserService.getUserArrayByIds(parent.disLikes);
  }

  static async comments(parent: any) {
    return CommentService.getCommentsByPostId(parent._id);
  }
}
