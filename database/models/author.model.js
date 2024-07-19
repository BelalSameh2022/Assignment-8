import { model, Schema, Types } from "mongoose";

const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    bio: {
      type: String,
      required: [true, "bio is required"],
      trim: true,
    },
    birthDate: {
      type: Date,
    },
    books: {
      type: [Types.ObjectId],
      ref: "Book",
      required: [true, "books is required"],
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Author = model("Author", authorSchema);

export default Author;
