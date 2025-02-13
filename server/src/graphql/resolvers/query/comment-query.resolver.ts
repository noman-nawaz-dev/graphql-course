import { CommentService } from "../../../services/comment.service";
import { PostService } from "../../../services/post.service";

export class CommentQueryResolver {
  static async post(parent: any) {
    return PostService.getPostById(parent.post);
  }

  static async getCommentsByPostId(
    parent: any,
    { postId }: { postId: string }
  ) {
    return CommentService.getCommentsByPostId(postId);
  }
}
