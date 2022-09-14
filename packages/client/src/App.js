import { useQuery } from '@apollo/client';
import { GET_TODOS } from './queries';

import Form from './components/Form';
import Todo from './components/Todo';

const App = () => {
  const { loading, error, data } = useQuery(GET_TODOS);

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <div>
      <h1>Todo List GraphQL</h1>
      <Form />
      {data.todos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default App;
