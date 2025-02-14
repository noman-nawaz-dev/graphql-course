import { MutationResolvers } from "../../generated/types";
import { CommentService } from "../../../services/comment.service";

export class CommentMutationResolver {
  static createComment: MutationResolvers["createComment"] = async (
    _,
    { input }
  ) => {
    return await CommentService.createComment(input);
  };
}
