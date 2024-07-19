import Book from "../../../database/models/book.model.js";
import { AppError, catchAsyncError } from "../../utils/error.js";

const addBook = catchAsyncError(async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json({ message: "success", book });
});

const getAllBooks = catchAsyncError(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const books = await Book.find()
    .skip((page - 1) * limit)
    .limit(+limit);
    if (books.length === 0) throw new AppError("There are no books have added yet", 404);
  res.status(200).json({ message: "success", books });
});

const getBookById = catchAsyncError(async (req, res) => {
  const { bookId } = req.params;
  const book = await Book.findById(bookId);
  if (!book) throw new AppError("Book doesn't exist", 404);
  res.status(200).json({ message: "success", book });
});

const updateBookById = catchAsyncError(async (req, res) => {
  const { bookId } = req.params;
  const book = await Book.findByIdAndUpdate(bookId, req.body, { new: true });
  if (!book) throw new AppError("Book doesn't exist", 404);
  res.status(200).json({ message: "success", book });
});

const deleteBookById = catchAsyncError(async (req, res) => {
  const { bookId } = req.params;
  const book = await Book.findByIdAndDelete(bookId);
  if (!book) throw new AppError("Book doesn't exist", 404);
  res.status(200).json({ message: "success", book });
});

const searchBookByTitleOrAuthor = catchAsyncError(async (req, res) => {
  const { key } = req.params;
  const book = await Book.find({
    $or: [
      { title: { $regex: key, $options: "i" } },
      { author: new RegExp(key, "i") },
    ],
  });
  res.status(200).json({ message: "success", book });
});

export {
  addBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
  searchBookByTitleOrAuthor,
};
