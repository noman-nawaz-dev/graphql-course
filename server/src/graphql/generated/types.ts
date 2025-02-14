import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Comment = {
  __typename?: "Comment";
  _id: Scalars["ID"]["output"];
  createdAt: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  post: Post;
  updatedAt: Scalars["String"]["output"];
  user: User;
};

export type CreateCommentInput = {
  description: Scalars["String"]["input"];
  post: Scalars["ID"]["input"];
  user: Scalars["ID"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  createComment: Scalars["Boolean"]["output"];
  updateUser: Scalars["Boolean"]["output"];
};

export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Post = {
  __typename?: "Post";
  _id: Scalars["ID"]["output"];
  category: Scalars["String"]["output"];
  comments?: Maybe<Array<Maybe<Comment>>>;
  createdAt: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  disLikes?: Maybe<Array<Maybe<User>>>;
  image: Scalars["String"]["output"];
  isDisLiked: Scalars["Boolean"]["output"];
  isFeatured: Scalars["Boolean"]["output"];
  isLiked: Scalars["Boolean"]["output"];
  likes?: Maybe<Array<Maybe<User>>>;
  numViews: Scalars["Int"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["String"]["output"];
  user: User;
};

export type Query = {
  __typename?: "Query";
  getAllPosts?: Maybe<Array<Maybe<Post>>>;
  getAllUsers?: Maybe<Array<Maybe<User>>>;
  getCommentsByPostId?: Maybe<Array<Maybe<Comment>>>;
  getPost?: Maybe<Post>;
  getUser?: Maybe<User>;
  getUserToken: Scalars["String"]["output"];
};

export type QueryGetCommentsByPostIdArgs = {
  postId: Scalars["ID"]["input"];
};

export type QueryGetPostArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryGetUserArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryGetUserTokenArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  lastName?: InputMaybe<Scalars["String"]["input"]>;
};

export type User = {
  __typename?: "User";
  _id: Scalars["ID"]["output"];
  accountVerificationToken?: Maybe<Scalars["String"]["output"]>;
  accountVerificationTokenExpires?: Maybe<Scalars["String"]["output"]>;
  active: Scalars["Boolean"]["output"];
  bio?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  firstName: Scalars["String"]["output"];
  followers?: Maybe<Array<Maybe<User>>>;
  following?: Maybe<Array<Maybe<User>>>;
  isAccountVerified: Scalars["Boolean"]["output"];
  isAdmin: Scalars["Boolean"]["output"];
  isBlocked: Scalars["Boolean"]["output"];
  isFollowing: Scalars["Boolean"]["output"];
  isUnFollowing: Scalars["Boolean"]["output"];
  lastName: Scalars["String"]["output"];
  newFollowersCount?: Maybe<Scalars["Int"]["output"]>;
  newReward?: Maybe<Scalars["Float"]["output"]>;
  newTotalLikes?: Maybe<Scalars["Int"]["output"]>;
  password: Scalars["String"]["output"];
  passwordChangeAt?: Maybe<Scalars["String"]["output"]>;
  passwordResetExpires?: Maybe<Scalars["String"]["output"]>;
  passwordRessetToken?: Maybe<Scalars["String"]["output"]>;
  postCount: Scalars["Int"]["output"];
  posts?: Maybe<Array<Maybe<Post>>>;
  prevFollowersCount?: Maybe<Scalars["Int"]["output"]>;
  prevReward?: Maybe<Scalars["Float"]["output"]>;
  prevTotalLikes?: Maybe<Scalars["Int"]["output"]>;
  profilePhoto: Scalars["String"]["output"];
  rewardBlockId?: Maybe<Scalars["Int"]["output"]>;
  role?: Maybe<UserRole>;
  updatedAt: Scalars["String"]["output"];
  viewedBy?: Maybe<Array<Maybe<User>>>;
  walletAddress?: Maybe<Scalars["String"]["output"]>;
};

export enum UserRole {
  Admin = "Admin",
  Blogger = "Blogger",
  Guest = "Guest",
  Unknown = "Unknown",
}

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  Comment: ResolverTypeWrapper<Comment>;
  CreateCommentInput: CreateCommentInput;
  Float: ResolverTypeWrapper<Scalars["Float"]["output"]>;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]["output"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  UserRole: UserRole;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars["Boolean"]["output"];
  Comment: Comment;
  CreateCommentInput: CreateCommentInput;
  Float: Scalars["Float"]["output"];
  ID: Scalars["ID"]["output"];
  Int: Scalars["Int"]["output"];
  Mutation: {};
  Post: Post;
  Query: {};
  String: Scalars["String"]["output"];
  UpdateUserInput: UpdateUserInput;
  User: User;
};

export type AuthDirectiveArgs = {
  roles?: Maybe<Array<UserRole>>;
};

export type AuthDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = AuthDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CommentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Comment"] = ResolversParentTypes["Comment"]
> = {
  _id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  post?: Resolver<ResolversTypes["Post"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  createComment?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateCommentArgs, "input">
  >;
  updateUser?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserArgs, "input">
  >;
};

export type PostResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Post"] = ResolversParentTypes["Post"]
> = {
  _id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  category?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  comments?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Comment"]>>>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  disLikes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["User"]>>>,
    ParentType,
    ContextType
  >;
  image?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  isDisLiked?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  isFeatured?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  isLiked?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  likes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["User"]>>>,
    ParentType,
    ContextType
  >;
  numViews?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  getAllPosts?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Post"]>>>,
    ParentType,
    ContextType
  >;
  getAllUsers?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["User"]>>>,
    ParentType,
    ContextType
  >;
  getCommentsByPostId?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Comment"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryGetCommentsByPostIdArgs, "postId">
  >;
  getPost?: Resolver<
    Maybe<ResolversTypes["Post"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetPostArgs, "id">
  >;
  getUser?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetUserArgs, "id">
  >;
  getUserToken?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType,
    RequireFields<QueryGetUserTokenArgs, "email" | "password">
  >;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  _id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  accountVerificationToken?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  accountVerificationTokenExpires?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  active?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  followers?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["User"]>>>,
    ParentType,
    ContextType
  >;
  following?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["User"]>>>,
    ParentType,
    ContextType
  >;
  isAccountVerified?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  isAdmin?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  isBlocked?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  isFollowing?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  isUnFollowing?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  newFollowersCount?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  newReward?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  newTotalLikes?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  password?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  passwordChangeAt?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  passwordResetExpires?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  passwordRessetToken?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  postCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  posts?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Post"]>>>,
    ParentType,
    ContextType
  >;
  prevFollowersCount?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  prevReward?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  prevTotalLikes?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  profilePhoto?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  rewardBlockId?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  role?: Resolver<Maybe<ResolversTypes["UserRole"]>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  viewedBy?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["User"]>>>,
    ParentType,
    ContextType
  >;
  walletAddress?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Comment?: CommentResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  auth?: AuthDirectiveResolver<any, any, ContextType>;
};
