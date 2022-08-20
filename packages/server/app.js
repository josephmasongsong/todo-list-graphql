const db = require('./db');
const { ApolloServer } = require('apollo-server');
const Todo = require('./todo');
const resolvers = require('./resolvers');
const typeDefs = require('./schema');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    Todo,
  },
});

server.listen().then(async ({ url }) => {
  await db();
  console.log(`🚀  Server ready at ${url}`);
});
