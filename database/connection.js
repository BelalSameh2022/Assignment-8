import { connect } from "mongoose";

connect("mongodb://localhost:27017/assignment-8")
  .then(() => console.log("Database connected successfully..."))
  .catch((err) => console.log(err));
