interface Comment {
  description: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    profilePhoto: string;
  };
}

export interface Post {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  numViews: number;
  comments: Comment[];
}
