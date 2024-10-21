import React from "react";
import { useState } from "react";
import "./style.css";

import Button from "../../shared/Button";
import icons from "../../assets/svg/icons";

const TodoForm = ({ submitHandler }) => {
  const [input, setInput] = useState("");

  const inputChangeHandler = (event) => {
    setInput(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    submitHandler({ text: input });
    setInput("");
  };

  return (
    <form className="form" onSubmit={formSubmitHandler}>
      <label for="todo">
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
