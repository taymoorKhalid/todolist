import React, { useState } from "react";
import Header from "../components/header";
import TodoForm from "../components/todoForm";
import TodoList from "../components/todoList";
import "./home.css";
import Section from "../components/section";

const Home: React.FC = () => {
  interface Todo {
    text: string;
    isCompleted: boolean;
  }

  const [todos, setTodos] = useState<Todo[]>([]);

  const submitHandler = (goal: Todo) => {
    setTodos((prevValues) => {
      return [...prevValues, { text: goal.text, isCompleted: false }];
    });
  };

  const toggleCompletion = (index: number) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos[index].isCompleted = !updatedTodos[index].isCompleted;
      return updatedTodos;
    });
  };

  const completedCount = todos.filter((todo) => todo.isCompleted).length;

  const deleteItem = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const editItem = (index: number, newText: string) => {
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
