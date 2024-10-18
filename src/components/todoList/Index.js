import React from "react";
import "./style.css";
import TodoItem from "../todoItem";

const TodoList = ({ todos, toggleCompletion, deleteItem, editItem }) => {
  return (
    <ol className="todoList">
      {todos.length > 0 ? (
        todos.map((todo, index) => (
          <TodoItem
            key={index}
            item={todo}
            toggleCompletion={() => toggleCompletion(index)}
            deleteItem={() => deleteItem(index)}
            editItem={(newText) => editItem(index, newText)}
          />
        ))
      ) : (
        <p>Seems lonely in here, what are you upto?</p>
      )}
    </ol>
  );
};

export default TodoList;
