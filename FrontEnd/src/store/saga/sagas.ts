import { takeEvery, put, call, takeLatest } from "redux-saga/effects";
import { TodoActionTypes } from "../../types/types";
import { TODO } from "../../types/types";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import {
  addTodoAction,
  deleteTodoAction,
  updateTodoAction,
  fetchTodosAction,
} from "../actions/todoActions";

import { authLoginAction } from "../actions/authActions";

function* handleApiError(error: any) {
  const errorMessage = error.response?.data?.message || "An error occurred!";
  if (error.response?.status === 403) {
    yield put(authLoginAction.REJECTED("Session expired")); // Dispatch logout action
    toast.error("Session expired. Please log in again.");
  } else {
    toast.error(errorMessage);
  }
}

function* fetchTodosSaga(): Generator {
  try {
    const response: any = yield call(axiosInstance.get, "/tasks/getTasks");
    yield put(fetchTodosAction.FULLFILLED(response.data.allTasks));
    toast.success(response.data.message);
  } catch (error: any) {
    yield put(fetchTodosAction.REJECTED(error.message));
    yield call(handleApiError, error);
  }
}

// Worker Saga for adding a todo
function* handleAddTodo(
  action: ReturnType<typeof addTodoAction.STARTED>
): Generator {
  try {
    const newTodo: TODO = action.payload;

    // Make the API call to add the todo
    const response: any = yield call(axiosInstance.post, "/tasks/addTask", {
      text: newTodo.text,
      isCompleted: newTodo.isCompleted,
    });

    yield put(addTodoAction.FULLFILLED(response.data.task)); // Dispatch 'success' action
    toast.success(response.data.message);
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Adding Todo failed! Please try again.";
    yield put(addTodoAction.REJECTED(errorMessage)); // Dispatch 'failure' action
    yield call(handleApiError, error);
  }
}

// Worker Saga for deleting a todo
function* handleDeleteTodo(
  action: ReturnType<typeof deleteTodoAction.STARTED>
): Generator {
  let id = "";
  try {
    id = action.payload; // Get the todo id to delete
    const response: any = yield call(
      axiosInstance.delete,
      `/tasks/delete/${id}`
    );
    yield put(deleteTodoAction.FULLFILLED(response.data.tasks)); // Dispatch 'success' action
    toast.success(response.data.message);
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    yield put(deleteTodoAction.REJECTED(errorMessage)); // Dispatch 'failure' action
    yield call(handleApiError, error);
  }
}

function* handleUpdateTodo(
  action: ReturnType<typeof updateTodoAction.STARTED>
): Generator {
  let id = action.payload.id;
  let text = action.payload.text;
  try {
    // Check if we need to update text or toggle status
    const response: any = yield call(
      axiosInstance.patch,
      `/tasks/update/${id}`,
      text ? { text } : {} // Only send the text if it's provided (for editing)
    );

    yield put(updateTodoAction.FULLFILLED(response.data.tasks)); // Dispatch 'success' action with the updated tasks
    toast.success(response.data.message);
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    yield put(updateTodoAction.REJECTED(errorMessage)); // Dispatch 'failure' action
    yield call(handleApiError, error);
  }
}

// Watcher Saga
function* watchTodoActions() {
  yield takeEvery(TodoActionTypes.ADD_TODO_REQUEST, handleAddTodo);
  yield takeEvery(TodoActionTypes.DELETE_TODO_REQUEST, handleDeleteTodo);
  yield takeEvery(TodoActionTypes.UPDATE_TODO_REQUEST, handleUpdateTodo);
  yield takeLatest(TodoActionTypes.FETCH_TODOS_REQUEST, fetchTodosSaga);
}

// Root Saga
export default function* todoSaga() {
  yield watchTodoActions();
}
