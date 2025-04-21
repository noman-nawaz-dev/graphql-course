// graphql.ts (optional, if you want to keep it modular)
import { UserService } from "../services/user.service";
import { graphQLSchema } from "./schema/schema";
import { graphQLResolver } from "./resolvers";

export { graphQLSchema, graphQLResolver };

export const graphQLContext = async ({ req }: { req: any }) => {
  try {
    const token = req.headers.authorization;
    if (!token) return {};
    const user = await UserService.getUserByToken(token);
    return { user };
  } catch (error) {
    return {};
  }
};
