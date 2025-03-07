import { gql } from "graphql-tag";
export const graphQLSchema = gql`
  directive @auth(roles: [UserRole!]) on FIELD_DEFINITION

  input CreateCommentInput {
    post: ID!
    user: ID!
    description: String!
  }

  input UpdateUserInput {
    id: ID!
    firstName: String
    lastName: String
    email: String
    bio: String
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    profilePhoto: String!
    email: String!
    walletAddress: String
    bio: String
    password: String!
    postCount: Int!
    rewardBlockId: Int
    newTotalLikes: Int
    prevTotalLikes: Int
    newFollowersCount: Int
    prevFollowersCount: Int
    newReward: Float
    prevReward: Float
    isBlocked: Boolean!
    isAdmin: Boolean!
    role: UserRole
    isFollowing: Boolean!
    isUnFollowing: Boolean!
    isAccountVerified: Boolean!
    accountVerificationToken: String
    accountVerificationTokenExpires: String
    viewedBy: [User]
    followers: [User]
    following: [User]
    passwordChangeAt: String
    passwordRessetToken: String
    passwordResetExpires: String
    active: Boolean!
    posts: [Post]
    createdAt: String!
    updatedAt: String!
  }

  type Post {
    _id: ID!
    title: String!
    category: String!
    isLiked: Boolean!
    isFeatured: Boolean!
    isDisLiked: Boolean!
    numViews: Int!
    likes: [User]
    disLikes: [User]
    user: User!
    description: String!
    image: String!
    comments: [Comment]
    createdAt: String!
    updatedAt: String!
  }

  type Comment {
    _id: ID!
    post: Post!
    user: User!
    description: String!
    createdAt: String!
    updatedAt: String!
  }

  enum UserRole {
    Admin
    Guest
    Blogger
    Unknown
  }

  type CommentNotification {
    description: String!
    user: CommentUser!
    postId: ID!
  }

  type CommentUser {
    firstName: String!
    lastName: String!
  }

  type Query {
    getAllUsers: [User] @auth(roles: [Admin, Blogger])
    getUser(id: ID!): User @auth(roles: [Guest, Admin])
    getAllPosts: [Post]
    getPost(id: ID!): Post @auth(roles: [Unknown, Admin, Guest, Blogger])
    getCommentsByPostId(postId: ID!): [Comment]
    getUserToken(email: String!, password: String!): String!
  }

  type Mutation {
    createComment(input: CreateCommentInput!): Boolean!
    updateUser(input: UpdateUserInput!): Boolean!
    deletePost(id: ID!): Boolean
  }

  type Subscription {
    commentCreated: CommentNotification!
  }
`;
