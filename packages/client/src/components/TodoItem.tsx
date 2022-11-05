import { useRef, useState, KeyboardEvent } from 'react';
import { useMutation } from '@apollo/client';
import { GET_TODOS, DELETE_TODO, UPDATE_TODO } from '../queries';

export interface ITodo {
  id: string;
  title: string;
  complete: boolean;
}

export interface ITodoData {
  todos: ITodo[];
}

const buttonStyle = {
  marginLeft: '5px',
};

const TodoItem = ({ todo }: { todo: ITodo }) => {
  const [isChecked, setIsChecked] = useState(todo.complete);
  const [editable, setEditable] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  const [deleteTodo] = useMutation<{ deleteTodo: ITodo }>(DELETE_TODO, {
    variables: { id: todo.id },
    update: (cache, { data }) => {
      const todo = data!.deleteTodo;

      const todoData: ITodoData = cache.readQuery({
        query: GET_TODOS,
      })!;

      const todos = todoData.todos.filter(t => t.id !== todo.id);

      cache.writeQuery({
        query: GET_TODOS,
        data: { todos },
      });
    },
  });
  const [updateTodo] = useMutation<{ updateTodo: ITodo }>(UPDATE_TODO);

  const handleUpdate = () => {
    updateTodo({
      variables: {
        id: todo.id,
        title: titleRef.current!.value,
      },
    });
    setEditable(false);
  };

  const handleUpdateOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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
      onKeyDown={handleUpdateOnKeyDown}
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

export default TodoItem;
