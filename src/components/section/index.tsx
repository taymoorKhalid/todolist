import React from "react";

import { useAppSelector } from "../../types/types";

import "./style.css";

const Section: React.FC = () => {
  const todos = useAppSelector((state) => state.todoList.todos);
  const completedCount: number = todos.filter(
    (todo) => todo.isCompleted
  ).length;

  return (
    <section className="section">
      <div>
        <p className="text-large">Task Done</p>
        <p className="text-small">Keep it up</p>
      </div>
      <div className="counter">
        {completedCount}/{todos.length}
      </div>
    </section>
  );
};

export default Section;
