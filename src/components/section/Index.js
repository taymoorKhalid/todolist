import React from "react";
import "./style.css";

const Section = ({ total, completedCount }) => {
  return (
    <section className="section">
      <div className="">
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
