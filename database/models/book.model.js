import { model, Schema } from "mongoose";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "content is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "author is required"],
      trim: true,
    },
    publishedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true, versionKey: false }
);

const Book = model("Book", bookSchema);

export default Book;
