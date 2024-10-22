import React, { useState } from "react";

import Button from "../../shared/Button";
import icons from "../../assets/svg/icons";

import "./style.css";

interface TodoFormProps {
  addTodo: (todo: { text: string; isCompleted: boolean }) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [input, setInput] = useState<string>("");

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo({ text: input, isCompleted: false });
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
