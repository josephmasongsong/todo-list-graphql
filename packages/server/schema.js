const { gql } = require('apollo-server');

const typeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    complete: Boolean!
  }

  type Query {
    todos: [Todo!]!
  }

  type Mutation {
    createTodo(title: String!, complete: Boolean!): Todo!
    updateTodo(id: ID!, title: String, complete: Boolean): Todo!
    deleteTodo(id: ID!): Todo!
  }
`;

module.exports = typeDefs;
