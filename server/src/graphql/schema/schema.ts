export const graphQLSchema = `
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
  }

  type Query {
    getAllUsers: [User]
    getUser(id: ID!): User
    getAllPosts: [Post]
    getPost(id: ID!): Post
    getCommentsByPostId(postId: ID!): [Comment]
    getUserToken(email: String!, password: String!): String!
  }

  type Mutation {
    createComment(post: ID!, user: ID!, description: String!): Boolean!
    updateUser(id: ID!, firstName: String, lastName: String,
      email: String,
      bio: String,
    ): Boolean!
  }
`;
