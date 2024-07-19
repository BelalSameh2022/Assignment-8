import express from "express";
import "./database/connection.js";
import authorRouter from "./src/modules/author/author.routes.js";
import bookRouter from "./src/modules/book/book.routes.js";
const app = express();
const port = 3000;

app.use(express.json());
app.use("/authors", authorRouter);
app.use("/books", bookRouter);

app.use("*", (req, res) => {
  res.status(404).json({ message: `Invalid URL, ${req.baseUrl} is not found` });
});

app.listen(port, () => console.log(`Server is running on port ${port}...`));