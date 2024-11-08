// import { PayloadAction } from "@reduxjs/toolkit";
import { TodoActionTypes, TODO } from "../../types/types";

const initialState = {
  todos: [] as TODO[], // Initialize todos as an empty array with type TODO[]
  isFetching: false,
  error: null as string | null,
};

export const todoReducer = (state = initialState, action: any) => {
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
        todos: action.payload, // Use the full updated tasks array from API response
      };

    case TodoActionTypes.DELETE_TODO_FAILURE:
      return {
        ...state,
        error: "Failed to delete todo",
      };

    case TodoActionTypes.UPDATE_TODO_REQUEST:
      return {
        ...state,
        error: null,
      };

    case TodoActionTypes.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        todos: action.payload, // Use the full updated tasks array from API response
      };

    case TodoActionTypes.UPDATE_TODO_FAILURE:
      return {
        ...state,
        error: "Failed to update todo",
      };

    default:
      return state;
  }
};
