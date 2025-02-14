import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      _id
      firstName
      lastName
      email
      profilePhoto
    }
  }
`;

export const GET_USER_BASIC = gql`
  query GetUserBasic($getUserId: ID!) {
    getUser(id: $getUserId) {
      firstName
      lastName
      email
      profilePhoto
      bio
      postCount
    }
  }
`;

export const GET_USER_CONNECTIONS = gql`
  query GetUserConnections($getUserId: ID!) {
    getUser(id: $getUserId) {
      followers {
        firstName
        lastName
        profilePhoto
      }
      following {
        firstName
        lastName
        profilePhoto
      }
    }
  }
`;

export const GET_USER_POSTS = gql`
  query GetUserPosts($getUserId: ID!) {
    getUser(id: $getUserId) {
      posts {
        _id
        category
        title
        description
        image
        numViews
      }
    }
  }
`;

export const GET_POST_COMMENTS = gql`
  query GetPostComments($postId: ID!) {
    getCommentsByPostId(postId: $postId) {
      description
      createdAt
      user {
        firstName
        lastName
        profilePhoto
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUser(id: $id) {
      _id
      firstName
      lastName
      email
      bio
    }
  }
`;

export const GET_USER_TOKEN = gql`
  query GetUserToken($email: String!, $password: String!) {
    getUserToken(email: $email, password: $password)
  }
`;
