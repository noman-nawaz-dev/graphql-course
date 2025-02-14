import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/graphql/schema/schema.ts",
  generates: {
    "./src/graphql/generated/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        scalars: {
          ID: "string",
        },
      },
    },
  },
};

export default config;
