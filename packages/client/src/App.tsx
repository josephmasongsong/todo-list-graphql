import { useQuery } from '@apollo/client';
import { GET_TODOS } from './queries';

import Form from './components/Form';
import TodoItem, { ITodo, ITodoData } from './components/TodoItem';

const App = () => {
  const { loading, error, data } = useQuery<ITodoData>(GET_TODOS);

  return (
    <div>
      <h1>Todo List GraphQL</h1>
      <Form />
      {loading ? <div>Loading...</div> : null}
      {error ? <div>There has been an error...</div> : null}
      {data
        ? data.todos.map((todo: ITodo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))
        : null}
    </div>
  );
};

export default App;
