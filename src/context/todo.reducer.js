import { SET_TODOS, ADD_TODO, DELETE_TODO, UPDATE_TODO } from "./todo.actions";

export const todoReducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case SET_TODOS:
      return { ...state, todos: data };
    case ADD_TODO:
      const todos = {
        ...state.todos,
        [data.id]: { description: data.description },
      };
      return { ...state, todos };
    case DELETE_TODO:
      delete state.todos[data.id]; // data passed in from the action
      return { ...state}; // ... spread operator (have a copy of state.todos) --> return the updated state
    case UPDATE_TODO:
      // write state.todos[data.id];
      state.todos[data.id].description = data.description
      return { ...state }

    default:
      return state;
  }
};
