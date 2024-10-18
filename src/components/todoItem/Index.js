import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import { Edit } from "../../assets/svg/Edit";
import { Bin } from "../../assets/svg/Bin";
import { Toggle } from "../../assets/svg/Toggle";
import Button from "../../shared/Button";

const TodoItem = ({ item, toggleCompletion, deleteItem, editItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(item.text);

  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditChange = (e) => {
    setNewText(e.target.value);
  };

  const handleEditSubmit = (e) => {
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
            <Toggle item={item} />
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
          <div class="item-right">
            <Button
              onClick={() => {
                setIsEditing(true);
              }}
            >
              <span class="visually-hidden">Edit</span>
              <Edit />
            </Button>
            <Button onClick={deleteItem}>
              <span class="visually-hidden">Delete</span>
              <Bin />
            </Button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
