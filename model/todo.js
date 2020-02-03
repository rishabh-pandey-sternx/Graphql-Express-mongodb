import mongoose from "mongoose";

const Schema = mongoose.Schema;

// create a schema
const toDoSchema = new Schema(
  {
    itemId: Number,
    item: String,
    completed: Boolean
  },
  { collection: "TodoList" }
);

// the schema is useless so far
// we need to create a model using it
const ToDo = mongoose.model("ToDo", toDoSchema);

export default ToDo;
