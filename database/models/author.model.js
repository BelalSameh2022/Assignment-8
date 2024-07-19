import { model, Schema, Types } from "mongoose";

const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    birthDate: {
      type: Date,
    },
    books: {
      type: [Types.ObjectId],
      ref: "Book",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Author = model("Author", authorSchema);

export default Author;
