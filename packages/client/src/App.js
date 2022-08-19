import { useQuery } from '@apollo/client';
import { GET_TODOS } from './queries';

import Form from './components/Form';
import Todo from './components/Todo';

const App = () => {
  const { loading, error, data } = useQuery(GET_TODOS);
  const options = { refetchQueries: [{ query: GET_TODOS }] };

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <div>
      <h1>Todo List</h1>
      <Form options={options} />
      {data.todos.map(todo => (
        <Todo key={todo.id} options={options} todo={todo} />
      ))}
    </div>
  );
};

export default App;
