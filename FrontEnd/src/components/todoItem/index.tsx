import React, { useState, useEffect } from "react";
import Button from "../../shared/Button";
import icons from "../../assets/svg/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Loader from "../../shared/Loader";
import { todoSchema } from "../../Validations/todo";
import InputField from "../../shared/Input";

import "./style.css";

interface editTodo {
  id: string;
  text: string;
  isCompleted: boolean;
}

interface TodoItemProps {
  todo: editTodo;
  onToggleTodo: (id: string) => void; // Pass ID to toggle
  onDeleteTodo: (id: string) => void; // Pass ID to delete
  onEditTodo: (id: string, newText: string) => void; // Pass ID to edit
}

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
    resolver: yupResolver(todoSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      text: todo.text,
    },
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setisLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isEditing) {
      setFocus("text");
    }
  }, [isEditing, setFocus]);

  useEffect(() => {
    setisLoading(false);
  }, [todo]);

  const handleEditSubmit = (data: FormData) => {
    setisLoading(true);
    onEditTodo(todo.id, data.text); // Pass the ID here
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleKeyDown = () => {
    clearErrors("text");
  };

  return (
    <li className="todoItem">
      {isEditing ? (
        <form className="edit-form" onSubmit={handleSubmit(handleEditSubmit)}>
          <label>
            <InputField
              name="text"
              type="text"
              className="edit-error"
              placeholder="Write your next task"
              register={register}
              errorMessage={errors.text?.message}
              showErrorIcon={true}
              onKeyDown={handleKeyDown} // Pass the handler to InputField (optional)
            />
          </label>
          <Button type="submit" disabled={loading}>
            Save
          </Button>
          <Button type="button" disabled={loading} onClick={handleCancelEdit}>
            Cancel
          </Button>
        </form>
      ) : (
        <>
          {loading ? (
            <Loader
              loading={loading}
              size={30}
              marginTop="0"
              color="green"
              marginLeft="20px"
            />
          ) : (
            <Button
              className="item-left"
              onClick={() => {
                setisLoading(true);
                onToggleTodo(todo.id);
              }}
            >
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
          )}
          <div className="item-right">
            <Button onClick={() => setIsEditing(true)} disabled={loading}>
              <span className="visually-hidden">Edit</span>
              {edit}
            </Button>

            <Button
              disabled={loading}
              onClick={() => {
                setisLoading(true);
                onDeleteTodo(todo.id);
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
