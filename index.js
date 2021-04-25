const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: (parent, args, ctx, info) => {
    return 'Hello world!';
  },
};

const app = express();
app.use('/graphql', graphqlHTTP(async (request) => ({
  schema: schema,
  rootValue: root,
  context: request.headers,
  graphiql: true,
})));

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
