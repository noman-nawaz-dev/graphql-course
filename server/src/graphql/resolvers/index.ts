import { CommentMutationResolver } from "./comment-mutation.resolver";
import { CommentQueryResolver } from "./comment-query.resolver";
import { PostQueryResolver } from "./post-query.resolver";
import { UserQueryResolver } from "./user-query.resolver";

export const graphQLResolver = {
  Query: {
    getAllUsers: UserQueryResolver.getAllUsers,
    getUser: UserQueryResolver.getUser,
    getAllPosts: PostQueryResolver.getAllPosts,
    getPost: PostQueryResolver.getPost,
  },

  Mutation: {
    createComment: CommentMutationResolver.createComment,
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
