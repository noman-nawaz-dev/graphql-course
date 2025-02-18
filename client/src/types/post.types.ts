export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
}

export interface Comment {
  _id: string;
  description: string;
  createdAt: string;
  user: User;
}

export interface Post {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  numViews: number;
  likes: { _id: string }[];
  disLikes: { _id: string }[];
  user: User;
  createdAt: string;
  comments: Comment[];
}
