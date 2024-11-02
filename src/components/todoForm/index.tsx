import React, { useState } from "react";

import Button from "../../shared/Button";
import icons from "../../assets/svg/icons";
import { addTodo } from "../../store/todo/todoSlice";
import { useAppDispatch } from "../../types/types";

import "./style.css";

const TodoForm: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const dispatch = useAppDispatch();

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addTodo({ text: input, isCompleted: false }));
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
