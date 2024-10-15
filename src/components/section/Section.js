import React from "react";
import "./section.css";

const Section = (props) => {
  return (
    <section className="section">
      <div className="">
        <p className="text-large">Task Done</p>
        <p className="text-small">Keep it up</p>
      </div>
      <div className="counter">
        {props.completedCount}/{props.total}
      </div>
    </section>
  );
};

export default Section;
