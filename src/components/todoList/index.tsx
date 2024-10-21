import React from "react";
import "./style.css";
import TodoItem from "../todoItem";

interface Todo {
  text: string;
  isCompleted: boolean;
}

interface TodoListProps {
  todos: Todo[]; // Array of Todo items
  toggleCompletion: (index: number) => void; // Function to toggle completion
  deleteItem: (index: number) => void; // Function to delete an item
  editItem: (index: number, newText: string) => void; // Function to edit an item
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleCompletion,
  deleteItem,
  editItem,
}) => {
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
