const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');

// Construct a schema, using GraphQL schema language
const typeDefs = `
  type Query {
    hello: String
    me: User
  }

  type User {
    name: String!
    email: String!
    age: Int
    address: Address
  }

  type Address {
    prefecture: String!
    postalCode: String!
  }
`

const user = {
  name: "hoge",
  email: "hoge@hoge.com",
  age: 25,
}

const address = {
  prefecture: "沖縄県",
  postalCode: "9040004"
}

const resolvers = {
  Query: {
    hello: (parent, args, ctx, info) => 'Hello world!',
    me: (parent, args, ctx, info) => user,
  },

  User: {
    address: () => address,
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers })


const app = express();
app.use('/graphql', graphqlHTTP(async (request) => {
  const { accept, cookie, } = request.headers
  const user = { sub: "1" }
  const ctx = { accept, cookie, user }

  return {
    schema: schema,
    context: ctx,
    graphiql: true,
  }
}));

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
