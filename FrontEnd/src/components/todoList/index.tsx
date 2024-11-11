import React, { useCallback, useEffect } from "react";

import TodoItemContainer from "../containers/TodoItemContainer";
import { TODO } from "../../types/types";
import Loader from "../../shared/Loader";

import "./style.css";

interface editTodo {
  id: string;
  text: string;
  isCompleted: boolean;
}

interface TodoListProps {
  todos: editTodo[];
  fetchTodos: () => TODO[];
  isLoading: boolean;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  fetchTodos,
  isLoading,
}) => {
  const stableFetchTodos = useCallback(() => fetchTodos(), [fetchTodos]);

  useEffect(() => {
    stableFetchTodos();
  }, [stableFetchTodos]);

  if (isLoading) {
    return (
      <Loader loading={isLoading} size={80} marginLeft="0" marginTop="40px" />
    ); // Show loader while fetching
  }

  return (
    <ol className="todoList">
      {todos.length > 0 ? (
        todos.map((todo) => <TodoItemContainer key={todo.id} todo={todo} />)
      ) : (
        <p>Seems lonely in here, what are you upto?</p>
      )}
    </ol>
  );
};

export default TodoList;
