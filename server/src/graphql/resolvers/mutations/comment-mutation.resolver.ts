import { MutationResolvers } from "../../generated/types";
import { CommentService } from "../../../services/comment.service";
import { pubsub } from "../../pubsub/pubsub";

export class CommentMutationResolver {
  static createComment: MutationResolvers["createComment"] = async (
    _,
    { input }
  ) => {
    // Create the comment first
    const success = await CommentService.createComment(input);

    if (success) {
      // Get notification data with description and user name
      const notificationData = await CommentService.getCommentNotificationData(
        input
      );

      // Publish the data to the subscription
      if (notificationData) {
        pubsub.publish("COMMENT_CREATED", {
          commentCreated: notificationData,
        });
      }
    }

    return success;
  };
}
