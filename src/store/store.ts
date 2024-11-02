import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "./todo/todoSlice";

export const store = configureStore({
  reducer: {
    todoList: TodoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
