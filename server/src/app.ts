import dotenv from "dotenv";
import { DatabaseManager } from "./database/DatabaseManager";
import { connectGraphQL, graphQLContext } from "./graphql/graphql";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
dotenv.config({ path: ".env" });

export const envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";
const port = Number(process.env.PORT) || 3000;
const mongoURI = process.env.MONGO_URI!;

DatabaseManager.getInstance().connect(mongoURI);

const graphQLServer = connectGraphQL();
await graphQLServer.start();

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  "/graphql",
  expressMiddleware(graphQLServer, {
    context: graphQLContext,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`);
});
