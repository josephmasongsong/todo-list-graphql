const { ApolloServer } = require('apollo-server');
const db = require('./config/db');
const todo = require('./api/todo');

const server = new ApolloServer({
  typeDefs: todo.typeDefs,
  resolvers: todo.resolvers,
  context: {
    Todo: todo.model,
  },
});

db();

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url} 🚀`);
});
