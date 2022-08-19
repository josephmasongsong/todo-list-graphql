import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TODO } from '../queries';

const Form = ({ options }) => {
  const [addTodo] = useMutation(ADD_TODO, options);
  const [title, setTitle] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    addTodo({ variables: { title } });
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
      <input type="submit" value="add todo" />
    </form>
  );
};

export default Form;
