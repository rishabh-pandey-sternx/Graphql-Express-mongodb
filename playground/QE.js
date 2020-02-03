//NOTE grapql + express

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var app = express();

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
    hello: () => {
        return 'Hello world!';
    },
};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000, () => {;
    console.log('Running a GraphQL API server at http://localhost:4000/graphql');
});



/**NOTE To run querries from command line
 * curl -X POST \
   -H "Content-Type: application/json" \
   -d '{"query": "{ hello }"}' \
   http://localhost:4000/graphql
 */