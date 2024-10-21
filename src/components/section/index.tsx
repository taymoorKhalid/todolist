import React from "react";
import "./style.css";

interface SectionProps {
  total: number; // Total number of tasks
  completedCount: number; // Count of completed tasks
}

const Section: React.FC<SectionProps> = ({ total, completedCount }) => {
  return (
    <section className="section">
      <div>
        <p className="text-large">Task Done</p>
        <p className="text-small">Keep it up</p>
      </div>
      <div className="counter">
        {completedCount}/{total}
      </div>
    </section>
  );
};

export default Section;
