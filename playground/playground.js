const { ApolloServer, gql } = require('apollo-server');
const uuid = require('uuid/v4');
const fs = require('fs');

const typeDefs = gql `
  type Quote {
    id: ID!
    phrase: String!
    quotee: String
  }

  type Query {
    quotes: [Quote]
  }
  
`;

const quotes = {};
const addQuote = quote => {
    const id = uuid();
    return quotes[id] = {...quote, id };
};

addQuote({ phrase: "I'm a leaf on the wind. Watch how I soar.", quotee: "Wash" });
addQuote({ phrase: "We're all stories in the end.", quotee: "The Doctor" });
addQuote({ phrase: "Woah!", quotee: "Neo" });
const WriteRsults = () => {
    const pathfile = "./file.json";
    var util = require('util');
    fs.writeFileSync(pathfile, util.inspect(quotes), 'utf-8');
};
WriteRsults();
const resolvers = {
    Query: {
        quotes: () => Object.values(quotes),
    },
};


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`); // eslint-disable-line no-console
});