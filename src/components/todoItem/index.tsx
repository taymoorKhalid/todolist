import React, { useState, useEffect } from "react";
import Button from "../../shared/Button";
import icons from "../../assets/svg/icons";
import { TODO } from "../../types/types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./style.css";

interface TodoItemProps {
  todo: TODO;
  onToggleTodo: () => void;
  onDeleteTodo: () => void;
  onEditTodo: (newText: string) => void;
}

const schema = yup.object().shape({
  text: yup
    .string()
    .required("This field is required")
    .min(3, "Task should be at least 3 characters")
    .matches(/^[a-zA-Z\s]+$/, "Task should only contain letters"),
});

interface FormData {
  text: string;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleTodo,
  onDeleteTodo,
  onEditTodo,
}) => {
  const { toggle, edit, bin } = icons;

  const {
    register,
    handleSubmit,
    setFocus,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      text: todo.text,
    },
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (isEditing) {
      setFocus("text");
    }
  }, [isEditing, setFocus]);

  const handleEditSubmit = (data: FormData) => {
    onEditTodo(data.text);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <li className="todoItem">
      {isEditing ? (
        <form className="edit-form" onSubmit={handleSubmit(handleEditSubmit)}>
          <label>
            <input
              {...register("text")}
              type="text"
              onChange={() => {
                clearErrors("text");
              }}
            />
            {errors.text && ( // Show error message if validation fails
              <span role="alert" className="edit-error">
                <i className="fas fa-exclamation-circle error-icon"></i>
                {errors.text.message}
              </span>
            )}
          </label>
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
            <Button onClick={() => setIsEditing(true)}>
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
