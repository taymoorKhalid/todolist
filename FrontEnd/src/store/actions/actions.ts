import { TodoActionTypes, TODO, Task } from "../../types/types";

export const addTodoAction = {
  STARTED: (todo: TODO) => ({
    type: TodoActionTypes.ADD_TODO_REQUEST,
    payload: todo,
  }),
  FULLFILLED: (todo: Task) => ({
    type: TodoActionTypes.ADD_TODO_SUCCESS,
    payload: todo,
  }),
  REJECTED: (error: string) => ({
    type: TodoActionTypes.ADD_TODO_FAILURE,
    payload: error,
  }),
};

export const fetchTodosAction = {
  STARTED: () => ({
    type: TodoActionTypes.FETCH_TODOS_REQUEST,
  }),
  FULLFILLED: (todos: Task[]) => ({
    type: TodoActionTypes.FETCH_TODOS_SUCCESS,
    payload: todos,
  }),
  REJECTED: (error: string) => ({
    type: TodoActionTypes.FETCH_TODOS_FAILURE,
    payload: error,
  }),
};

export const deleteTodoAction = {
  STARTED: (id: string) => ({
    type: TodoActionTypes.DELETE_TODO_REQUEST,
    payload: id, // Pass the id instead of index
  }),
  FULLFILLED: (tasks: Task[]) => ({
    type: TodoActionTypes.DELETE_TODO_SUCCESS,
    payload: tasks,
  }),
  REJECTED: (error: string) => ({
    type: TodoActionTypes.DELETE_TODO_FAILURE,
    payload: error,
  }),
};

export const updateTodoAction = {
  STARTED: (id: string, text?: string) => ({
    type: TodoActionTypes.UPDATE_TODO_REQUEST,
    payload: { id, text }, // text is optional for toggle
  }),
  FULLFILLED: (tasks: Task[]) => ({
    type: TodoActionTypes.UPDATE_TODO_SUCCESS,
    payload: tasks,
  }),
  REJECTED: (error: string) => ({
    type: TodoActionTypes.UPDATE_TODO_FAILURE,
    payload: error,
  }),
};
