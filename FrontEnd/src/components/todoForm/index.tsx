import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { todoSchema } from "../../Validations/todo";

import Button from "../../shared/Button";
import icons from "../../assets/svg/icons";
import InputField from "../../shared/Input";

import "./style.css";

interface TodoFormProps {
  addTodo: (todo: { text: string; isCompleted: boolean }) => void;
}

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
    resolver: yupResolver(todoSchema),
    reValidateMode: "onSubmit",
  });

  const formSubmitHandler = (data: FormData) => {
    addTodo({ text: data.text, isCompleted: false });
    reset(); // Clear form input after submission
  };

  const handleKeyDown = () => {
    clearErrors("text");
  };

  return (
    <form className="form" onSubmit={handleSubmit(formSubmitHandler)}>
      <label htmlFor="todo">
        <InputField
          name="text"
          type="text"
          id="todo"
          className="error"
          placeholder="Write your next task"
          register={register}
          errorMessage={errors.text?.message}
          showErrorIcon={true}
          onKeyDown={handleKeyDown} // Pass the handler to InputField (optional)
        />
      </label>
      <Button type="submit" ariaLabel="Submit">
        {icons.add}
        <span className="visually-hidden">Submit</span>
      </Button>
    </form>
  );
};

export default TodoForm;
