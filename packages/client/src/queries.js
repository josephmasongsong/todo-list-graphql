import { gql } from '@apollo/client';

const GET_TODOS = gql`
  query GetTodos {
    todos {
      title
      id
      complete
    }
  }
`;

const CREATE_TODO = gql`
  mutation CreateTodo($title: String!, $complete: Boolean!) {
    createTodo(title: $title, complete: $complete) {
      id
      title
      complete
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
      title
      complete
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $title: String, $complete: Boolean) {
    updateTodo(id: $id, title: $title, complete: $complete) {
      id
      title
      complete
    }
  }
`;

export { GET_TODOS, CREATE_TODO, DELETE_TODO, UPDATE_TODO };
