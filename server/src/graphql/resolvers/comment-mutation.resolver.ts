import { CommentService } from "../../services/comment.service";

interface CommentInput {
  post: string;
  user: string;
  description: string;
}

export class CommentMutationResolver {
  static createComment = async (parent: any, commentInput: CommentInput) => {
    const { post, user, description } = commentInput;
    const comment = await CommentService.createComment(post, user, description);
    return comment;
  };
}
