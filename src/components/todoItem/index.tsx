import React, { useState, useRef, useEffect } from "react";
import Button from "../../shared/Button";
import icons from "../../assets/svg/icons";

import "./style.css";

interface TodoItemProps {
  todo: { text: string; isCompleted: boolean };
  onToggleTodo: () => void;
  onDeleteTodo: () => void;
  onEditTodo: (newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleTodo,
  onDeleteTodo,
  onEditTodo,
}) => {
  const { toggle, edit, bin } = icons;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newText, setNewText] = useState<string>(todo.text);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewText(e.target.value);
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEditTodo(newText);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setNewText(todo.text); // Reset the text back to original
    setIsEditing(false); // Close the edit mode
  };

  return (
    <li className="todoItem">
      {isEditing ? (
        <form className="edit-form" onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={newText}
            onChange={handleEditChange}
            ref={inputRef}
          />
          <Button type="submit">Save</Button>
          <Button type="button" onClick={handleCancelEdit}>
            Cancel
          </Button>
        </form>
      ) : (
        <>
          <Button className="item-left" onClick={onToggleTodo}>
            {toggle({ todo })}
            <p
              style={{
                textDecoration: todo.isCompleted ? "line-through" : "none",
                wordWrap: "break-word",
                whiteSpace: "normal",
                maxWidth: "100%",
                overflowWrap: "anywhere",
              }}
            >
              {todo.text}
            </p>
          </Button>
          <div className="item-right">
            <Button
              onClick={() => {
                setIsEditing(true);
              }}
            >
              <span className="visually-hidden">Edit</span>
              {edit}
            </Button>
            <Button onClick={onDeleteTodo}>
              <span className="visually-hidden">Delete</span>
              {bin}
            </Button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
