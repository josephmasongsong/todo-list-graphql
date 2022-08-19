import { useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_TODO, GET_TODOS, UPDATE_TODO } from '../queries';

const Todo = ({ todo, options }) => {
  const [isChecked, setIsChecked] = useState(todo.complete);
  const [editable, setEditable] = useState(false);
  const titleRef = useRef();

  const [deleteTodo] = useMutation(DELETE_TODO, options);
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
      name="title"
      ref={titleRef}
      id={todo.id}
      onKeyDown={e => handleUpdateOnKeyDown(e)}
    />
  );

  return (
    <div style={{ marginTop: '5px' }}>
      {todoItem}

      {!todo.complete && (
        <button onClick={() => setEditable(!editable)}>
          {editable ? 'cancel' : 'edit'}
        </button>
      )}

      {editable ? (
        <button onClick={handleUpdate}>save</button>
      ) : (
        <>
          {!todo.complete && (
            <button
              onClick={() =>
                deleteTodo({
                  variables: {
                    id: todo.id,
                  },
                })
              }
            >
              delete
            </button>
          )}

          <label>
            <input
              type="checkbox"
              name="complete"
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
