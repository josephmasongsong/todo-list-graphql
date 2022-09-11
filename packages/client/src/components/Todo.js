import { useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_TODOS, DELETE_TODO, UPDATE_TODO } from '../queries';

const buttonStyle = {
  marginLeft: '5px',
};

const Todo = ({ todo }) => {
  const [isChecked, setIsChecked] = useState(todo.complete);
  const [editable, setEditable] = useState(false);
  const titleRef = useRef();

  const [deleteTodo] = useMutation(DELETE_TODO, {
    variables: { id: todo.id },
    update: (cache, { data }) => {
      const todo = data.deleteTodo;

      const todoData = cache.readQuery({
        query: GET_TODOS,
      });

      const todos = todoData.todos.filter(t => t.id !== todo.id);

      cache.writeQuery({
        query: GET_TODOS,
        data: { todos },
      });
    },
  });
  const [updateTodo] = useMutation(UPDATE_TODO);

  const handleUpdate = () => {
    updateTodo({
      variables: {
        id: todo.id,
        title: titleRef.current.value,
      },
    });
    setEditable(false);
  };

  const handleUpdateOnKeyDown = e => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      handleUpdate();
    }
  };

  const handleCheck = () => {
    updateTodo({
      variables: { id: todo.id, complete: !isChecked },
    });
    setIsChecked(!isChecked);
  };

  const todoItem = !editable ? (
    <span style={todo.complete ? { textDecoration: 'line-through' } : {}}>
      {todo.title}
    </span>
  ) : (
    <input
      type="text"
      defaultValue={todo.title}
      ref={titleRef}
      id={todo.id}
      onKeyDown={e => handleUpdateOnKeyDown(e)}
    />
  );

  return (
    <div style={{ marginTop: '5px' }}>
      {todoItem}

      {!todo.complete && (
        <button onClick={() => setEditable(!editable)} style={buttonStyle}>
          {editable ? 'cancel' : 'edit'}
        </button>
      )}

      {editable ? (
        <button onClick={handleUpdate} style={buttonStyle}>
          save
        </button>
      ) : (
        <>
          {!todo.complete && (
            <button onClick={() => deleteTodo()} style={buttonStyle}>
              delete
            </button>
          )}

          <label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => handleCheck()}
            />
            {!todo.complete ? 'incomplete' : 'complete'}
          </label>
        </>
      )}
    </div>
  );
};

export default Todo;
