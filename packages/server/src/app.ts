import { ApolloServer } from 'apollo-server';
import * as todo from './api/todo';
import db from './config/db';

const server = new ApolloServer({
  typeDefs: todo.typeDefs,
  resolvers: todo.resolvers,
  context: {
    Todo: todo.model,
  },
});

db();

server.listen().then(({ url }: { url: string }) => {
  console.log(`Server ready at ${url} 🚀`);
});
