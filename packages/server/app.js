const db = require('./db');
const { ApolloServer } = require('apollo-server');
const Todo = require('./models/todo');
const resolvers = require('./resolvers');
const typeDefs = require('./schema');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({
    req,
    res,
    Todo,
  }),
});

server.listen().then(async ({ url }) => {
  await db();
  console.log(`🚀  Server ready at ${url}`);
});
