import { PostService } from "../../services/post.service";

export class CommentQueryResolver {
  static async post(parent: any) {
    return PostService.getPostById(parent.post);
  }
}
