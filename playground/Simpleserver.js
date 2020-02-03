/**
 * In most situations, all you need to do is to
 * specify the types for your API using the
 * GraphQL schema language, taken as an argument
 * to the buildSchema function.
 */
var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");
var app = express();

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? "Take it easy" : "Salvation lies within";
  },
  random: () => {
    return Math.random();
  },
  rollThreeDice: () => {
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
  },
  //NOTE In cases of passing args
  rollDice: ({ numDice, numSides }) => {
    var output = [];
    for (var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  }
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(4000, () => {
  console.log("Running a GraphQL API server at localhost:4000/graphql");
});
