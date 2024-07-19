import Author from "../../../database/models/author.model.js";
import { catchAsyncError } from "../../utils/error.js";

const addAuthor = catchAsyncError(async (req, res) => {
  const author = await Author.create(req.body);
  res.status(201).json({ message: "success", author });
});

const getAllAuthors = catchAsyncError(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const authors = await Author.find()
    .populate("books", "title -_id")
    .skip((page - 1) * limit)
    .limit(+limit);
    if (authors.length === 0) throw new AppError("There are no authors have added yet", 404);
  res.status(200).json({ message: "success", authors });
});

const getAuthorById = catchAsyncError(async (req, res) => {
  const { authorId } = req.params;
  const author = await Author.findById(authorId).populate(
    "books",
    "title -_id"
  );
  if (!author) throw new AppError("Author doesn't exist", 404);
  res.status(200).json({ message: "success", author });
});

const updateAuthorById = catchAsyncError(async (req, res) => {
  const { authorId } = req.params;
  const author = await Author.findByIdAndUpdate(authorId, req.body, {
    new: true,
  });
  if (!author) throw new AppError("Author doesn't exist", 404);
  res.status(200).json({ message: "success", author });
});

const deleteAuthorById = catchAsyncError(async (req, res) => {
  const { authorId } = req.params;
  const author = await Author.findByIdAndDelete(authorId);
  if (!author) throw new AppError("Author doesn't exist", 404);
  res.status(200).json({ message: "success", author });
});

const searchAuthorByNameOrBio = catchAsyncError(async (req, res) => {
  const { key } = req.params;
  const authors = await Author.find({
    $or: [
      { name: { $regex: key, $options: "i" } },
      { bio: new RegExp(key, "i") },
    ],
  });
  res.status(200).json({ message: "success", authors });
});

export {
  addAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthorById,
  deleteAuthorById,
  searchAuthorByNameOrBio,
};
