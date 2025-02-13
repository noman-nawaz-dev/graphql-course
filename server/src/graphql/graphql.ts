import { ApolloServer } from "@apollo/server";
import { graphQLSchema } from "./schema/schema";
import { graphQLResolver } from "./resolvers/index";
import { UserService } from "../services/user.service";
export const connectGraphQL = () => {
  const server = new ApolloServer({
    typeDefs: graphQLSchema,
    resolvers: graphQLResolver,
  });
  return server;
};

export const graphQLContext = async ({ req }: { req: any }) => {
  try {
    const token = req.headers.authorization;
    if (!token) return { user: null };
    const user = await UserService.getUserByToken(token);
    return { user };
  } catch (error) {
    return { user: null };
  }
};
