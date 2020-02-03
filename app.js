import express from "express";
import bodyParser from "body-parser";
import graphqlHTTP from "express-graphql";
import Routes from "./config/Routes";

//DB
import ToDo from "./model/todo";
//Graph
import schema from "./graphql/Schema/Schema";
import { graphql } from "graphql";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

//SECTION Render static html
app.get(Routes.base, (req, res) => {
  res.sendFile(__dirname + Routes.index);
});
//SECTION Play with graph schema
app.use(
  Routes.Graph,
  graphqlHTTP(req => ({
    schema,
    graphiql: true
  }))
);

//SECTION The app
app.post(Routes.quotes, (req, res) => {
  // Insert into TodoList Collection
  var todoItem = new ToDo({
    itemId: 1,
    item: req.body.item,
    completed: false
  });

  todoItem.save((err, result) => {
    if (err) {
      console.log("---TodoItem save failed " + err);
    }
    console.log("TodoItem saved successfully " + todoItem.item);
    res.redirect(Routes.base);
  });
});
export default app;
