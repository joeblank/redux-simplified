import { createStore } from 'redux';

// === INITIAL STATE ===
const initialState = {
  todos: [{ text: 'remove react-redux', completed: false }, { text: 'celebrate', completed: false }]
}

// === ACTION TYPES ===
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_STATUS = 'TOGGLE_STATUS';
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED';

// === REDUCER ===
function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload] }
    case TOGGLE_STATUS:
      const updatedTodos = state.todos.map((todo, i) => {
        if (i === action.payload) todo.completed = !todo.completed;
        return todo;
      })
      return { ...state, todos: updatedTodos };
    case CLEAR_COMPLETED:
      return { ...state, todos: state.todos.filter(todo => !todo.completed) }
    default:
      return state;
  }
}


// === EXPORT CREATED STORE ===
export default createStore(reducer)