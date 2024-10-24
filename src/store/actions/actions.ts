import { TodoActionTypes, TODO } from "../../types/types";

export const addTodoAction = {
  STARTED: (todo: TODO) => ({
    type: TodoActionTypes.ADD_TODO_REQUEST,
    payload: todo,
  }),
  FULLFILLED: (todo: TODO) => ({
    type: TodoActionTypes.ADD_TODO_SUCCESS,
    payload: todo,
  }),
  REJECTED: (error: string) => ({
    type: TodoActionTypes.ADD_TODO_FAILURE,
    payload: error,
  }),
};

export const toggleTodoAction = {
  STARTED: (index: number) => ({
    type: TodoActionTypes.TOGGLE_TODO_REQUEST,
    payload: index,
  }),
  FULLFILLED: (index: number) => ({
    type: TodoActionTypes.TOGGLE_TODO_SUCCESS,
    payload: index,
  }),
  REJECTED: (error: string) => ({
    type: TodoActionTypes.TOGGLE_TODO_FAILURE,
    payload: error,
  }),
};

export const deleteTodoAction = {
  STARTED: (index: number) => ({
    type: TodoActionTypes.DELETE_TODO_REQUEST,
    payload: index,
  }),
  FULLFILLED: (index: number) => ({
    type: TodoActionTypes.DELETE_TODO_SUCCESS,
    payload: index,
  }),
  REJECTED: (error: string) => ({
    type: TodoActionTypes.DELETE_TODO_FAILURE,
    payload: error,
  }),
};

export const editTodoAction = {
  STARTED: (index: number, text: string) => ({
    type: TodoActionTypes.UPDATE_TODO_REQUEST,
    payload: { index, text },
  }),
  FULLFILLED: (index: number, text: string) => ({
    type: TodoActionTypes.UPDATE_TODO_SUCCESS,
    payload: { index, text },
  }),
  REJECTED: (error: string) => ({
    type: TodoActionTypes.UPDATE_TODO_FAILURE,
    payload: error,
  }),
};
