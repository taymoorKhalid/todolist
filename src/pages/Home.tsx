import React from "react";
import Header from "../components/header";
import TodoForm from "../components/todoForm";
import TodoList from "../components/todoList";
import Section from "../components/section";

import "./home.css";

const Home: React.FC = () => {
  return (
    <div className="container">
      <div className="wrapper">
        <Header />
        <Section />
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
};

export default Home;
