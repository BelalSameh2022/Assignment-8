import { Router } from "express";
import {
  addAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthorById,
  deleteAuthorById,
  searchAuthorByNameOrBio,
} from "./author.controllers.js";

const authorRouter = Router();

authorRouter.route("/").post(addAuthor).get(getAllAuthors);
authorRouter
  .route("/:authorId")
  .get(getAuthorById)
  .patch(updateAuthorById)
  .delete(deleteAuthorById);
authorRouter.get("/search/:key", searchAuthorByNameOrBio);

export default authorRouter;
