import express from "express";
import "./database/connection.js";
import authorRouter from "./src/modules/author/author.routes.js";
import bookRouter from "./src/modules/book/book.routes.js";
import { AppError } from "./src/utils/error.js";

process.on("uncaughtException", () => console.log("Error!"));

const app = express();
const port = 3000;
app.use(express.json());

app.use("/authors", authorRouter);
app.use("/books", bookRouter);

app.use("*", (req, res, next) => {
  next(new AppError(`Invalid URL: ${req.originalUrl} not found`, 404));
});

app.use((err, req, res, next) => {
  const { message, statusCode } = err;
  res.status(statusCode || 500).json({ message, error: true });
});

app.listen(port, () => console.log(`Server is running on port ${port}...`));

process.on("unhandledRejection", () => console.log("Error!"));
