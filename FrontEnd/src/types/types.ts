import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

// types.ts

export enum TodoActionTypes {
  ADD_TODO_REQUEST = "addTodoRequest",
  ADD_TODO_SUCCESS = "addTodoSuccess",
  ADD_TODO_FAILURE = "addTodoFailure",

  DELETE_TODO_REQUEST = "deleteTodoRequest",
  DELETE_TODO_SUCCESS = "deleteTodoSuccess",
  DELETE_TODO_FAILURE = "deleteTodoFailure",

  UPDATE_TODO_REQUEST = "updateTodoRequest",
  UPDATE_TODO_SUCCESS = "updateTodoSuccess",
  UPDATE_TODO_FAILURE = "updateTodoFailure",

  FETCH_TODOS_REQUEST = "fetchTodosRequest",
  FETCH_TODOS_SUCCESS = "fetchTodosSuccess",
  FETCH_TODOS_FAILURE = "fetchTodosFailure",
}

export enum authActionTypes {
  LOGIN_REQUEST = "loginRequest",
  LOGIN_SUCCESS = "loginSuccess",
  LOGIN_FAILURE = "loginFailure",

  LOGOUT_REQUEST = "logoutRequest",
  LOGOUT_SUCCESS = "logoutSuccess",
  LOGOUT_FAILURE = "logoutFailure",

  SIGNUP_REQUEST = "signupRequest",
  SIGNUP_SUCCESS = "signupSuccess",
  SIGNUP_FAILURE = "signupFailure",
}

export type TODO = { id?: string; text: string; isCompleted: boolean };

export interface Task {
  id: string; // MongoDB-assigned unique identifier (getter version of _id)
  _id: string; // Original MongoDB ID field
  userId: string; // ID of the user associated with the task
  text: string; // Task description
  isCompleted: boolean; // Task completion status
  __v: number; // MongoDB document versioning field
}
