import React, { useState } from "react";
import Header from "../components/header/Header";
import TodoForm from "../components/todoForm/TodoForm";
import TodoList from "../components/todoList/TodoList";
import "./home.css";
import Section from "../components/section/Section";

const Home = () => {
  const [todos, setTodos] = useState([]);

  const submitHandler = (goal) => {
    setTodos((prevValues) => {
      return [...prevValues, { text: goal.text, isCompleted: false }];
    });
  };

  const toggleCompletion = (index) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos[index].isCompleted = !updatedTodos[index].isCompleted;
      return updatedTodos;
    });
  };

  const completedCount = todos.filter((todo) => todo.isCompleted).length;

  const deleteItem = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const editItem = (index, newText) => {
    const updatedTodos = [...todos];
    updatedTodos[index].text = newText;
    setTodos(updatedTodos);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <Header />
        <Section total={todos.length} completedCount={completedCount} />
        <TodoForm submitHandler={submitHandler} />
        <TodoList
          todos={todos}
          toggleCompletion={toggleCompletion}
          deleteItem={deleteItem}
          editItem={editItem}
        />
      </div>
    </div>
  );
};

export default Home;
