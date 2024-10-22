import React from "react";

import "./style.css";
import TodoItemContainer from "../containers/TodoItemContainer";

interface Todo {
  text: string;
  isCompleted: boolean;
}

interface TodoListProps {
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <ol className="todoList">
      {todos.length > 0 ? (
        todos.map((todo, index) => (
          <TodoItemContainer key={index} index={index} todo={todo} />
        ))
      ) : (
        <p>Seems lonely in here, what are you upto?</p>
      )}
    </ol>
  );
};

export default TodoList;
