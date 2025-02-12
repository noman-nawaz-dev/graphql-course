import { ApolloServer } from "@apollo/server";
import { graphQLSchema } from "./schema/schema";
import { graphQLResolver } from "./resolvers/index";

export const connectGraphQL = () => {
  const server = new ApolloServer({
    typeDefs: graphQLSchema,
    resolvers: graphQLResolver,
  });
  return server;
};
