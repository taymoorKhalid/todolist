// store/store.ts

import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./reducers/todoReducers";
import authReducer from "./reducers/authReducer"; // Import the auth reducer

import createSagaMiddleware from "redux-saga";
import todoSaga from "./saga/sagas"; // Import todo saga
import authSaga from "./saga/authSaga"; // Import auth saga

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    todoList: todoReducer,
    auth: authReducer, // Add the auth reducer here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Run both sagas
sagaMiddleware.run(todoSaga);
sagaMiddleware.run(authSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
