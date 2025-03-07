import { CommentMutationResolver } from "./mutations/comment-mutation.resolver";
import { CommentQueryResolver } from "./query/comment-query.resolver";
import { PostQueryResolver } from "./query/post-query.resolver";
import { UserQueryResolver } from "./query/user-query.resolver";
import { UserMutationResolver } from "./mutations/user-mutation.resolver";
import { PostMutationResolver } from "./mutations/post-mutation.resolver";
import { pubsub } from "../pubsub/pubsub"; // Adjust the path as necessary

export const graphQLResolver = {
  Query: {
    getAllUsers: UserQueryResolver.getAllUsers,
    getUser: UserQueryResolver.getUser,
    getAllPosts: PostQueryResolver.getAllPosts,
    getPost: PostQueryResolver.getPost,
    getCommentsByPostId: CommentQueryResolver.getCommentsByPostId,
    getUserToken: UserQueryResolver.getUserToken,
  },

  Mutation: {
    createComment: CommentMutationResolver.createComment,
    updateUser: UserMutationResolver.updateUser,
    deletePost: PostMutationResolver.deletePost,
  },
  Subscription: {
    commentCreated: {
      subscribe: () => pubsub.asyncIterableIterator(["COMMENT_CREATED"]),
    },
  },
  User: {
    viewedBy: UserQueryResolver.viewedBy,
    followers: UserQueryResolver.followers,
    following: UserQueryResolver.following,
    posts: UserQueryResolver.posts,
  },
  Post: {
    user: PostQueryResolver.user,
    likes: PostQueryResolver.likes,
    disLikes: PostQueryResolver.disLikes,
    comments: PostQueryResolver.comments,
  },
  Comment: {
    post: CommentQueryResolver.post,
  },
};
