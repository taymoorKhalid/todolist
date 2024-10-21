import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import Button from "../../shared/Button";
import icons from "../../assets/svg/icons";

interface TodoItemProps {
  item: {
    text: string;
    isCompleted: boolean;
  };
  toggleCompletion: () => void; // Function to toggle completion
  deleteItem: () => void; // Function to delete item
  editItem: (newText: string) => void; // Function to edit item with new text
}

const TodoItem: React.FC<TodoItemProps> = ({
  item,
  toggleCompletion,
  deleteItem,
  editItem,
}) => {
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
    editItem(newText); // Call editItem with the new text
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
          <Button className="item-left" onClick={toggleCompletion}>
            {icons.toggle({ item })}
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
              {icons.edit}
            </Button>
            <Button onClick={deleteItem}>
              <span className="visually-hidden">Delete</span>
              {icons.bin}
            </Button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
