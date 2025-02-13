import { UserService } from "../../../services/user.service";

export class UserMutationResolver {
  static async updateUser(
    parent: any,
    {
      id,
      firstName,
      lastName,
      email,
      bio,
    }: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      bio: string;
    }
  ) {
    return UserService.updateUser(id, firstName, lastName, email, bio);
  }
}
