'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _todo = require('./model/todo');

var _todo2 = _interopRequireDefault(_todo);

var _Schema = require('./graphql/Schema/Schema');

var _Schema2 = _interopRequireDefault(_Schema);

var _graphql = require('graphql');

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.urlencoded({ extended: true }));

_mongoose2.default.connect('mongodb://localhost:27017/Graphql');

var db = _mongoose2.default.connection;
db.on('error', function () {
    console.log('FAILED to connect to mongoose');
});
db.once('open', function () {
    console.log('Connected to MongoDb');
});

app.listen(3000, function () {
    console.log("Express Server is Running @ Port -> 3000!!!");
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use('/graphql', (0, _expressGraphql2.default)(function (req) {
    return {
        schema: _Schema2.default
        //,graphiql:true
    };
}));

app.post('/quotes', function (req, res) {
    // Insert into TodoList Collection
    var todoItem = new _todo2.default({
        itemId: 1,
        item: req.body.item,
        completed: false
    });

    todoItem.save(function (err, result) {
        if (err) {
            console.log("---TodoItem save failed " + err);
        }
        console.log("TodoItem saved successfully " + todoItem.item);
        res.redirect('/');
    });
});
//# sourceMappingURL=index.js.map
