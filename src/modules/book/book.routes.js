import { Router } from "express";
import {
  addBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
  searchBookByTitleOrAuthor
} from "./book.controllers.js";

const bookRouter = Router();
bookRouter.route("/").post(addBook).get(getAllBooks);
bookRouter
  .route("/:bookId")
  .get(getBookById)
  .patch(updateBookById)
  .delete(deleteBookById);
bookRouter.get("/search/:key", searchBookByTitleOrAuthor)

export default bookRouter;
