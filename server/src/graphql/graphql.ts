import { ApolloServer } from "@apollo/server";
import { graphQLSchema } from "./schema/schema";
import { graphQLResolver } from "./resolvers/index";
import { UserService } from "../services/user.service";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { authDirectiveTransformer } from "../auth/auth.directive";

export const connectGraphQL = () => {
  let schema = makeExecutableSchema({
    typeDefs: graphQLSchema,
    resolvers: graphQLResolver,
  });

  schema = authDirectiveTransformer(schema);
  const server = new ApolloServer({
    schema,
  });

  return server;
};

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
