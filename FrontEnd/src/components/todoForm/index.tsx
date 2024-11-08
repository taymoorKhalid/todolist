import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Button from "../../shared/Button";
import icons from "../../assets/svg/icons";

import "./style.css";

interface TodoFormProps {
  addTodo: (todo: { text: string; isCompleted: boolean }) => void;
}

// Define Yup validation schema
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

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
  });

  const formSubmitHandler = (data: FormData) => {
    addTodo({ text: data.text, isCompleted: false });
    reset(); // Clear form input after submission
  };

  return (
    <form className="form" onSubmit={handleSubmit(formSubmitHandler)}>
      <label htmlFor="todo">
        <input
          {...register("text")} // Register the input
          id="todo"
          type="text"
          placeholder="Write your next task"
          onKeyDown={() => {
            clearErrors("text"); // Handle key down event and clear errors
          }}
          aria-invalid={errors.text ? "true" : "false"} // Indicate if there is an error
        />
        {errors.text && ( // Show error only if submitted and errors exist
          <span role="alert" className="error">
            <i className="fas fa-exclamation-circle error-icon"></i>
            {errors.text?.message}
          </span>
        )}
      </label>
      <Button type="submit" ariaLabel="Submit">
        {icons.add}
        <span className="visually-hidden">Submit</span>
      </Button>
    </form>
  );
};

export default TodoForm;
