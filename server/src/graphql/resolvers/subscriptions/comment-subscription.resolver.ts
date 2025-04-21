import { pubsub } from "../../pubsub/pubsub";
export class CommentSubscriptionResolver {
  public static commentCreated = {
    subscribe: () => pubsub.asyncIterableIterator(["COMMENT_CREATED"]),
  };
}
