import { GraphQLError } from "graphql";
import { Book } from "./models/book.model.js";

export default {
  Query: {
    book: async (parent, { id }, context) => {
      const book = await Book.findOne({ where: { id: id } });
      if (!book) {
        throw new GraphQLError("book is not found", {
          extensions: {
            code: "NOT_FOUND",
            http: {
              code: 404,
            },
          },
        });
      }
      return book;
    },

    books: async () => {
      try {
        const books = await Book.findAll();
        return books;
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
