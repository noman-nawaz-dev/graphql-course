import { UserService } from "../services/user.service";
import { createServer } from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
// @ts-ignore
import { useServer } from "graphql-ws/use/ws";
import { graphQLSchema } from "./schema/schema";
import { graphQLResolver } from "./resolvers";
import { authDirectiveTransformer } from "../auth/auth.directive";
import { ApolloServer } from "@apollo/server";

export async function connectToGraphQL(
  httpServer: ReturnType<typeof createServer>
) {
  // Create executable schema
  const executableSchema = makeExecutableSchema({
    typeDefs: graphQLSchema,
    resolvers: graphQLResolver,
  });

  const schema = authDirectiveTransformer(executableSchema);

  // Create WebSocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  wsServer.on("connection", (ws) => {
    console.log("WebSocket client connected");

    ws.on("close", () => {
      console.log("WebSocket client disconnected");
    });
  });

  // Initialize serverCleanup
  const serverCleanup = useServer({ schema }, wsServer);

  // Create and return Apollo Server
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
  return server;
}

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
