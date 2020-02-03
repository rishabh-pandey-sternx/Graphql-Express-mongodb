const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const startDatabase = require("./database");
const expressPlayground = require("graphql-playground-middleware-express")
  .default;
const { config } = require("../config/Routes.json");
// Create a context for holding contextual data
const context = async () => {
  const db = await startDatabase();

  return { db };
};
const app = express();
app.use(
  config.Graph,
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    context
  })
);
app.get("/playground", expressPlayground({ endpoint: "/graphql" })); //to get playground

app.listen(4000);

console.log(`🚀 Server ready at http://localhost:4000/graphql`);
