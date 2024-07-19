import Book from "../../../database/models/book.model.js";

const addBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json({ message: "success", book });
};

const getAllBooks = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const books = await Book.find()
    .skip((page - 1) * limit)
    .limit(+limit);
  res.status(200).json({ message: "success", books });
};
const getBookById = async (req, res) => {
  const { bookId } = req.params;
  const book = await Book.findById(bookId);
  res.status(200).json({ message: "success", book });
};
const updateBookById = async (req, res) => {
  const { bookId } = req.params;
  const book = await Book.findByIdAndUpdate(bookId, req.body, { new: true });
  res.status(200).json({ message: "success", book });
};
const deleteBookById = async (req, res) => {
  const { bookId } = req.params;
  const book = await Book.findByIdAndDelete(bookId);
  res.status(200).json({ message: "success", book });
};
const searchBookByTitleOrAuthor = async (req, res) => {
  const { key } = req.params;
  const book = await Book.find({
    $or: [
      { title: { $regex: key, $options: "i" } },
      { author: new RegExp(key, "i") },
    ],
  });
  res.status(200).json({ message: "success", book });
};

export {
  addBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
  searchBookByTitleOrAuthor,
};
