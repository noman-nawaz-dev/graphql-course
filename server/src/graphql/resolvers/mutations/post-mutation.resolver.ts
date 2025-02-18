import { PostService } from "../../../services/post.service";
import { MutationResolvers } from "../../generated/types";

export class PostMutationResolver {
  static deletePost: MutationResolvers["deletePost"] = async (
    _,
    { id },
    context
  ) => {
    return await PostService.deletePost(id, context?.user?._id);
  };
}
