const db = require('./db');
require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const Todo = require('./models/todo');

const resolvers = require('./resolvers');
const typeDefs = require('./schema');

db();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({
    req,
    res,
    Todo,
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
