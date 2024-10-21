import React from "react";
import { useState } from "react";
import "./style.css";

import Button from "../../shared/Button";
import icons from "../../assets/svg/icons";

interface Todo {
  text: string;
  isCompleted: boolean;
}

// Define the props interface
interface TodoFormProps {
  submitHandler: (goal: Todo) => void; // This remains the same since the function does not return a value
}
const TodoForm: React.FC<TodoFormProps> = ({ submitHandler }) => {
  const [input, setInput] = useState<string>("");

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitHandler({ text: input, isCompleted: false });
    setInput("");
  };

  return (
    <form className="form" onSubmit={formSubmitHandler}>
      <label htmlFor="todo">
        <input
          id="todo"
          type="text"
          onChange={inputChangeHandler}
          value={input}
          placeholder="Write your next task"
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
