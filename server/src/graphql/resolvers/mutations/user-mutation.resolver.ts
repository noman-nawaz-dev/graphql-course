import { UserService } from "../../../services/user.service";
import { MutationResolvers, UpdateUserInput } from "../../generated/types";

export class UserMutationResolver {
  static updateUser: MutationResolvers["updateUser"] = async (
    _,
    { input }: { input: UpdateUserInput }
  ) => {
    return UserService.updateUser(input);
  };
}
