import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  text: string;
  isCompleted: boolean;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },

    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos[action.payload];
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
      }
    },

    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos.splice(action.payload, 1);
    },

    editTodo: (
      state,
      action: PayloadAction<{ index: number; text: string }>
    ) => {
      const todo = state.todos[action.payload.index];
      if (todo) {
        todo.text = action.payload.text;
      }
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, editTodo } = todoSlice.actions;

export default todoSlice.reducer;
