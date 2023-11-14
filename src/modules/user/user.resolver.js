import { GraphQLError } from "graphql";
import { User } from "./models/user.model.js";

export default {
  Query: {
    user: async (parent, { id }, context) => {
      const user = await User.findOne({ where: { id: id } });
      if (!user) {
        throw new GraphQLError("user is not found", {
          extensions: {
            code: "NOT_FOUND",
            http: {
              code: 404,
            },
          },
        });
      }
      return user;
    },

    users: async () => {
      try {
        const users = await User.findAll();
        return users;
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            http: {
              code: 500,
            },
          },
        });
      }
    },
  },
};
