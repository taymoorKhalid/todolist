import React, { useState, useRef, useEffect } from "react";
import Button from "../../shared/Button";
import icons from "../../assets/svg/icons";
import { useAppDispatch, useAppSelector } from "../../types/types";
import { toggleTodo, deleteTodo, editTodo } from "../../store/todo/todoSlice";

import "./style.css";

interface TodoItemProps {
  index: number;
}

const TodoItem: React.FC<TodoItemProps> = ({ index }) => {
  const { toggle, edit, bin } = icons;

  const item = useAppSelector((state) => state.todoList.todos[index]);
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newText, setNewText] = useState<string>(item.text);

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
    dispatch(
      editTodo({
        index,
        text: newText,
      })
    );
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setNewText(item.text); // Reset the text back to original
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
          <Button
            className="item-left"
            onClick={() => {
              dispatch(toggleTodo(index));
            }}
          >
            {toggle({ item })}
            <p
              style={{
                textDecoration: item.isCompleted ? "line-through" : "none",
                wordWrap: "break-word",
                whiteSpace: "normal",
                maxWidth: "100%",
                overflowWrap: "anywhere",
              }}
            >
              {item.text}
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
            <Button
              onClick={() => {
                dispatch(deleteTodo(index));
              }}
            >
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
