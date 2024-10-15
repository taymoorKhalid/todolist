import React from "react";
import "./todolist.css";
import TodoItem from "../todoItem/TodoItem";

const TodoList = (props) => {
  return (
    <ol className="todoList">
      {props.todos.length > 0 ? (
        props.todos.map((todo, index) => (
          <TodoItem
            key={index}
            item={todo}
            toggleCompletion={() => props.toggleCompletion(index)}
            deleteItem={() => props.deleteItem(index)}
            editItem={(newText) => props.editItem(index, newText)}
          />
        ))
      ) : (
        <p>Seems lonely in here, what are you upto?</p>
      )}
    </ol>
  );
};

export default TodoList;
