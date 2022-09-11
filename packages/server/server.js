const { ApolloServer } = require('apollo-server');
const db = require('./db');
const Todo = require('./model');
const resolvers = require('./resolvers');
const typeDefs = require('./schema');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    Todo,
  },
});

db();

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url} 🚀`);
});
