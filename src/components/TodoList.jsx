import React, { useContext, useEffect, useState } from "react";
import { Button, Input } from "antd";
import { TodoContext } from "../context/TodoContextProvider";
import { deleteTodo, updateTodo, setTodos } from "../context/todo.actions";
import { firebaseApi } from "../services/firebaseApi"

const TodoTask = (props) => {
  const [inputValue, setInputValue] = useState(props.description);
  const [readMode, setReadMode] = useState(true);

  console.log(readMode)

  let todoItem = <div className="todo-task__name" data-cy="todo-task__name" onClick={() => setReadMode(!readMode)}>
      {inputValue}
    </div>;

console.log(readMode)
  if(!readMode) {
    todoItem = <Input
      value={inputValue}
      onChange={({target: {value}}) => setInputValue(value)}
      placeholder={props.description}
      size="large"
      className="todo-input__input"
      data-cy="todo-input__input"
    />
  }

  return (
    <div className="todo-task">
      {todoItem}
      <Button
        type="primary"
        shape="round"
        className="todo-task__button"
        data-cy="todo-task__button-update"
        onClick={() => {props.update(props.id, inputValue); setReadMode(!readMode)}}
      >
        Update
      </Button>
      <Button
        type="primary"
        shape="round"
        className="todo-task__button"
        data-cy="todo-task__button-delete"
        onClick={() => props.delete(props.id)}
      >
        Delete
      </Button>
    </div>
  );
};

export const TodoList = () => {
  const { state } = useContext(TodoContext);
  const { dispatch } = useContext(TodoContext);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await firebaseApi.fetchTodos();
      dispatch(setTodos(todos));
    }

    fetchTodos();
  }, [dispatch]);

  const handleDeleteTodo = (id) => {
    console.log(id)
    dispatch(deleteTodo(id));
    firebaseApi.deleteTodo(id);
  };

  const handleUpdateTodo = (id, description) => {
    console.log(id)
    dispatch(updateTodo(id, description));
    firebaseApi.updateTodo(id, description);
  };

  return (
    <div className="todo-list" data-cy="todo-list">
      {Object.entries(state.todos).map(([id, todo]) => (
        <TodoTask
          key={id}
          description={todo.description}
          delete={handleDeleteTodo}
          update={handleUpdateTodo}
          id={id}
        />
      ))}
    </div>
  );
};
