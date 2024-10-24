// import { PayloadAction } from "@reduxjs/toolkit";
import { TodoActionTypes, TODO } from "../../types/types";

const initialState = {
  todos: [] as TODO[], // Define type of todos array as TODO[]
  loading: false,
  error: null as string | null,
};

export const todoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TodoActionTypes.ADD_TODO_REQUEST:
      return {
        ...state,
        loading: true, // Set loading to true when a request is initiated
        error: null, // Reset error on new request
      };

    case TodoActionTypes.ADD_TODO_SUCCESS:
      return {
        ...state,
        todos: [...state.todos, action.payload],
        loading: false,
      };

    case TodoActionTypes.ADD_TODO_FAILURE:
      return {
        ...state,
        loading: false, // Set loading to false on failure
        error: "Failed to add todo", // Set error message
      };

    case TodoActionTypes.DELETE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.filter((_, i) => i !== action.payload), // Remove todo by index
      };

    case TodoActionTypes.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.map((todo, i) =>
          i === action.payload.index
            ? { ...todo, text: action.payload.text } // Update todo text at index
            : todo
        ),
      };

    case TodoActionTypes.TOGGLE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.map((todo, i) =>
          i === action.payload
            ? { ...todo, isCompleted: !todo.isCompleted } // Toggle todo completion status
            : todo
        ),
      };

    // Handle more cases like TOGGLE_TODO_SUCCESS...
    default:
      return state;
  }
};
