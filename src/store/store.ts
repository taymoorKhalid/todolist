import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./reducers/reducers";

import createSagaMiddleware from "redux-saga";
import todoSaga from "./saga/sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    todoList: todoReducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(todoSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
