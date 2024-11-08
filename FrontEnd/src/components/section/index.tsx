import React from "react";

import "./style.css";

interface SectionProps {
  completedCount: number;
  todosLength: number;
}

const Section: React.FC<SectionProps> = ({ completedCount, todosLength }) => {
  return (
    <section className="section">
      <div>
        <p className="text-large">Task Done</p>
        <p className="text-small">Keep it up</p>
      </div>
      <div className="counter">
        {completedCount}/{todosLength}
      </div>
    </section>
  );
};

export default Section;
