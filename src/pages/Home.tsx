import React from "react";

import SectionContainer from "../components/containers/SectionContainer";
import TodoFormContainer from "../components/containers/TodoFormContainer";

import "./home.css";
import TodoListContainer from "../components/containers/TodoListContainer";
import HeaderContainer from "../components/containers/HeaderContainer";

const Home: React.FC = () => {
  return (
    <div className="container">
      <div className="wrapper">
        <HeaderContainer />
        <SectionContainer />
        <TodoFormContainer />
        <TodoListContainer />
      </div>
    </div>
  );
};

export default Home;
