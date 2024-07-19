import Author from "../../../database/models/author.model.js";

const addAuthor = async (req, res) => {
  const author = await Author.create(req.body);
  res.status(201).json({ message: "success", author });
};
const getAllAuthors = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const authors = await Author.find()
    .populate("books", "title -_id")
    .skip((page - 1) * limit)
    .limit(+limit);
  res.status(200).json({ message: "success", authors });
};
const getAuthorById = async (req, res) => {
  const { authorId } = req.params;
  const author = await Author.findById(authorId).populate(
    "books",
    "title -_id"
  );
  res.status(200).json({ message: "success", author });
};
const updateAuthorById = async (req, res) => {
  const { authorId } = req.params;
  const author = await Author.findByIdAndUpdate(authorId, req.body, {
    new: true,
  });
  res.status(200).json({ message: "success", author });
};
const deleteAuthorById = async (req, res) => {
  const { authorId } = req.params;
  const author = await Author.findByIdAndDelete(authorId);
  if (!author) return res.status(404).json({ message: "Author not found" });
  res.status(200).json({ message: "success", author });
};

const searchAuthorByNameOrBio = async (req, res) => {
  const { key } = req.params;
  const authors = await Author.find({
    $or: [
      { name: { $regex: key, $options: "i" } },
      { bio: new RegExp(key, "i") },
    ],
  });
  res.status(200).json({ message: "success", authors });
};

export {
  addAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthorById,
  deleteAuthorById,
  searchAuthorByNameOrBio
};
