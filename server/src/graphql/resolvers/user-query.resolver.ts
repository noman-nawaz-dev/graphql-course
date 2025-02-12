import { UserService } from "../../services/user.service";
import { PostService } from "../../services/post.service";
export class UserQueryResolver {
  static async getAllUsers() {
    return UserService.getAllUsers();
  }

  static async getUser(_: any, { id }: { id: string }) {
    return UserService.getUserById(id);
  }

  static async viewedBy(parent: any) {
    return UserService.getUserArrayByIds(parent.viewedBy);
  }

  static async followers(parent: any) {
    return UserService.getUserArrayByIds(parent.followers);
  }

  static async following(parent: any) {
    return UserService.getUserArrayByIds(parent.following);
  }

  static async posts(parent: any) {
    return PostService.getPostsByUserId(parent._id);
  }
}
