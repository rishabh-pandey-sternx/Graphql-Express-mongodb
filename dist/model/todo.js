'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

// create a schema
var toDoSchema = new Schema({
    itemId: Number,
    item: String,
    completed: Boolean
}, { collection: "TodoList" });

// the schema is useless so far
// we need to create a model using it
var ToDo = _mongoose2.default.model('ToDo', toDoSchema);

exports.default = ToDo;
module.exports = exports['default'];
//# sourceMappingURL=todo.js.map
