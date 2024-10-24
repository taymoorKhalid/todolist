import { takeEvery, put } from "redux-saga/effects";
import { TodoActionTypes } from "../../types/types";
import { TODO } from "../../types/types";
import {
  addTodoAction,
  deleteTodoAction,
  editTodoAction,
  toggleTodoAction,
} from "../actions/actions";

interface IAction {
  type: string;
  payload: TODO | number | { index: number; text: string };
}

// Worker Saga for adding a todo
function* handleAddTodo(action: IAction) {
  console.log(action);
  try {
    const newTodo = action.payload;
    // Here you might want to simulate a call to an API, e.g., yield call(api.addTodo, newTodo);
    yield put(addTodoAction.FULLFILLED(newTodo as TODO)); // Dispatch 'success' action
  } catch (error: any) {
    yield put(addTodoAction.REJECTED(error.message)); // Dispatch 'failure' action
  }
}

// Worker Saga for deleting a todo
function* handleDeleteTodo(action: IAction) {
  console.log("Delete:", action);
  try {
    const index = action.payload;
    // Here you might want to simulate a call to an API
    yield put(deleteTodoAction.FULLFILLED(index as number)); // Dispatch 'success' action
  } catch (error: any) {
    yield put(deleteTodoAction.REJECTED(error.message)); // Dispatch 'failure' action
  }
}

// Worker Saga for updating a todo
function* handleUpdateTodo(action: IAction) {
  console.log("Update:", action);
  try {
    const { index, text } = action.payload as { index: number; text: string };
    // Here you might want to simulate a call to an API
    yield put(editTodoAction.FULLFILLED(index, text)); // Dispatch 'success' action
  } catch (error: any) {
    yield put(editTodoAction.REJECTED(error.message)); // Dispatch 'failure' action
  }
}

// Worker Saga for toggling a todo
function* handleToggleTodo(action: any) {
  console.log("Toggle:", action);
  try {
    const index = action.payload;
    // Here you might want to simulate a call to an API
    yield put(toggleTodoAction.FULLFILLED(index)); // Dispatch 'success' action
  } catch (error: any) {
    yield put(toggleTodoAction.REJECTED(error.message)); // Dispatch 'failure' action
  }
}

// Watcher Saga
function* watchTodoActions() {
  yield takeEvery(TodoActionTypes.ADD_TODO_REQUEST, handleAddTodo);
  yield takeEvery(TodoActionTypes.DELETE_TODO_REQUEST, handleDeleteTodo);
  yield takeEvery(TodoActionTypes.UPDATE_TODO_REQUEST, handleUpdateTodo);
  yield takeEvery(TodoActionTypes.TOGGLE_TODO_REQUEST, handleToggleTodo);
}

// Root Saga
export default function* todoSaga() {
  yield watchTodoActions();
}
