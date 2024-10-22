import React from "react";
import Header from "../components/header";
import SectionContainer from "../components/containers/SectionContainer";
import TodoFormContainer from "../components/containers/TodoFormContainer";

import "./home.css";
import TodoListContainer from "../components/containers/TodoListContainer";

const Home: React.FC = () => {
  return (
    <div className="container">
      <div className="wrapper">
        <Header />
        <SectionContainer />
        <TodoFormContainer />
        <TodoListContainer />
      </div>
    </div>
  );
};

export default Home;
