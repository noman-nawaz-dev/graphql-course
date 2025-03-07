import dotenv from "dotenv";
import { DatabaseManager } from "./database/DatabaseManager";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { connectToGraphQL } from "./graphql/graphql";
import { graphQLContext } from "./graphql/graphql";

dotenv.config({ path: ".env" });

export const envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";
const port = Number(process.env.PORT) || 3000;
const mongoURI = process.env.MONGO_URI!;

DatabaseManager.getInstance().connect(mongoURI);

const app = express();
const httpServer = createServer(app);

async function startServer() {
  const server = await connectToGraphQL(httpServer);
  await server.start();
  app.use(express.json());
  app.use(cors());
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: graphQLContext,
    })
  );

  httpServer.listen(port, () => {
    console.log(`HTTP Server running on: http://localhost:${port}`);
    console.log(
      `WebSocket Server running on: ws://localhost:${port}/subscriptions`
    );
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
});
