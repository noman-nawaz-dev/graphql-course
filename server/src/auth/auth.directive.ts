import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { defaultFieldResolver, GraphQLSchema } from "graphql";
import { GraphQLError } from "graphql";

export function authDirectiveTransformer(schema: GraphQLSchema) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(schema, fieldConfig, "auth")?.[0];

      if (authDirective) {
        const { roles: allowedRoles } = authDirective;
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = async function (source, args, context, info) {
          const { user } = context;
          const userRole = user ? user.role : "Unknown";

          if (!allowedRoles.includes(userRole)) {
            throw new GraphQLError(`[${allowedRoles}] role is required`, {
              extensions: {
                code: "FORBIDDEN",
                allowedRoles,
                currentRole: userRole,
              },
            });
          }

          return resolve(source, args, context, info);
        };
      }
      return fieldConfig;
    },
  });
}
