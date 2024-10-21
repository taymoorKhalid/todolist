import React from "react";
import TodoItem from "../todoItem";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import "./style.css";

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todoList.todos);
  return (
    <ol className="todoList">
      {todos.length > 0 ? (
        todos.map((todo, index) => <TodoItem key={index} index={index} />)
      ) : (
        <p>Seems lonely in here, what are you upto?</p>
      )}
    </ol>
  );
};

export default TodoList;
