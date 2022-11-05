import { useState, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_TODO, GET_TODOS } from '../queries';
import { ITodo, ITodoData } from './TodoItem';

const Form = () => {
  const [createTodo] = useMutation<{ createTodo: ITodo }>(CREATE_TODO);
  const [title, setTitle] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTodo({
      variables: { title, complete: false },
      update: (cache, { data }) => {
        const newTodo = data!.createTodo;
        const todoData = cache.readQuery({
          query: GET_TODOS,
        }) as ITodoData;

        cache.writeQuery({
          query: GET_TODOS,
          data: { todos: [...todoData.todos, newTodo] },
        });
      },
    });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input type="submit" value="add todo" style={{ marginLeft: '5px' }} />
    </form>
  );
};

export default Form;
