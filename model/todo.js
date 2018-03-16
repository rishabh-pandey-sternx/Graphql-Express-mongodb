import mongoose from 'mongoose';

var Schema = mongoose.Schema;

// create a schema
var toDoSchema = new Schema({
    itemId: Number,
    item: String,
    completed: Boolean
}, {collection:"TodoList"});

// the schema is useless so far
// we need to create a model using it
var ToDo = mongoose.model('ToDo', toDoSchema);

export default ToDo
