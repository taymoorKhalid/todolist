import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

// types.ts

export enum TodoActionTypes {
  ADD_TODO_REQUEST = "addTodoRequest",
  ADD_TODO_SUCCESS = "addTodoSuccess",
  ADD_TODO_FAILURE = "addTodoFailure",

  TOGGLE_TODO_REQUEST = "toggleTodoRequest",
  TOGGLE_TODO_SUCCESS = "toggleTodoSuccess",
  TOGGLE_TODO_FAILURE = "toggleTodoFailure",

  DELETE_TODO_REQUEST = "deleteTodoRequest",
  DELETE_TODO_SUCCESS = "deleteTodoSuccess",
  DELETE_TODO_FAILURE = "deleteTodoFailure",

  UPDATE_TODO_REQUEST = "updateTodoRequest",
  UPDATE_TODO_SUCCESS = "updateTodoSuccess",
  UPDATE_TODO_FAILURE = "updateTodoFailure",
}

export type TODO = { text: string; isCompleted: boolean };
