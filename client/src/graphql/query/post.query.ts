import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      _id
      title
      image
      numViews
      description
      createdAt
      likes {
        _id
      }
      disLikes {
        _id
      }
      user {
        _id
        firstName
        lastName
        profilePhoto
      }
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query GetPost($id: ID!) {
    getPost(id: $id) {
      _id
      title
      image
      description
      createdAt
      comments {
        _id
        description
        createdAt
        user {
          firstName
          lastName
          profilePhoto
        }
      }
      user {
        _id
        firstName
        lastName
        profilePhoto
      }
    }
  }
`;
