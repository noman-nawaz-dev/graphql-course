export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
}

export interface UserConnection {
  firstName: string;
  lastName: string;
  profilePhoto: string;
}
