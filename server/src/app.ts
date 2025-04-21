import { DatabaseManager } from "./database/DatabaseManager";
import { ApolloServer } from "@apollo/server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphQLSchema } from "./graphql/schema/schema";
import { graphQLResolver } from "./graphql/resolvers";
import { graphQLContext } from "./graphql/graphql";
import { authDirectiveTransformer } from "./auth/auth.directive";
import { UserService } from "./services/user.service";
import {
  startServerAndCreateLambdaHandler,
  handlers,
} from "@as-integrations/aws-lambda";
import express, { Express } from "express";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env" });

export const envMode = process.env.NODE_ENV?.trim() || "development";
const port = Number(process.env.PORT) || 8000;
const mongoURI = process.env.MONGO_URI;

if (mongoURI) {
  DatabaseManager.getInstance().connect(mongoURI);
}

// Create Apollo Server instance
const createApolloServer = async () => {
  const executableSchema = makeExecutableSchema({
    typeDefs: graphQLSchema,
    resolvers: graphQLResolver,
  });
  const schema = authDirectiveTransformer(executableSchema);
  const server = new ApolloServer({
    schema,
  });
  await server.start();
  return server;
};

// Local development server
async function startLocalServer() {
  try {
    const server = await createApolloServer();
    const app: Express = express();
    app.use(express.json());
    app.use(cors());
    app.use(
      "/graphql",
      expressMiddleware(server, {
        context: graphQLContext,
      })
    );

    app.listen(port, () => {
      console.log(
        `HTTP Server running on: http://localhost:${port}/graphql mode=${envMode}`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

// Lambda handler
export const handler = async (event: any, context: any, callback: any) => {
  // Important: This tells Lambda not to close the event loop until all connections are closed
  context.callbackWaitsForEmptyEventLoop = false;

  // Connect to MongoDB if not already connected
  if (mongoURI && !DatabaseManager.getInstance().isConnected) {
    await DatabaseManager.getInstance().connect(mongoURI);
  }

  // Create the Apollo server handler
  const apolloHandler = startServerAndCreateLambdaHandler(
    new ApolloServer({
      schema: authDirectiveTransformer(
        makeExecutableSchema({
          typeDefs: graphQLSchema,
          resolvers: graphQLResolver,
        })
      ),
      introspection: true,
    }),
    handlers.createAPIGatewayProxyEventV2RequestHandler(),
    {
      context: async ({ event }) => {
        try {
          const token = event.headers?.authorization;
          if (!token) return {};
          const user = await UserService.getUserByToken(token);
          return { user };
        } catch (error) {
          return {};
        }
      },
    }
  );

  // Call the handler with the event, context, and callback
  return apolloHandler(event, context, callback);
};

// Start local server if not in production
if (envMode !== "production") {
  startLocalServer();
}
