// import { PayloadAction } from "@reduxjs/toolkit";
import { TodoActionTypes, TODO } from "../../types/types";

const initialState = {
  todos: [] as TODO[], // Initialize todos as an empty array with type TODO[]
  isFetching: false,
  error: null as string | null,
};

const todoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TodoActionTypes.FETCH_TODOS_REQUEST:
      return { ...state, isFetching: true, error: null };

    case TodoActionTypes.FETCH_TODOS_SUCCESS:
      const fetchedState = {
        ...state,
        isFetching: false,
        todos: action.payload,
      };
      return fetchedState;

    case TodoActionTypes.FETCH_TODOS_FAILURE:
      return { ...state, isFetching: false, error: action.payload };

    case TodoActionTypes.ADD_TODO_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };

    case TodoActionTypes.ADD_TODO_SUCCESS:
      const addedState = {
        ...state,
        todos: [...state.todos, action.payload],
        isFetching: false,
      };
      return addedState;

    case TodoActionTypes.ADD_TODO_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: "Failed to add todo", // Set error message
      };

    case TodoActionTypes.DELETE_TODO_REQUEST:
      return {
        ...state,
        error: null,
      };

    case TodoActionTypes.DELETE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload), // Filter out the deleted task
      };

    case TodoActionTypes.DELETE_TODO_FAILURE:
      return {
        ...state,
        error: action.payload, // Use the error message from the action
      };

    case TodoActionTypes.UPDATE_TODO_REQUEST:
      return {
        ...state,
        error: null,
      };

    case TodoActionTypes.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };

    case TodoActionTypes.UPDATE_TODO_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default todoReducer;
