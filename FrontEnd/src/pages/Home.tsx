import React, { useEffect } from "react";

import SectionContainer from "../components/containers/SectionContainer";
import TodoFormContainer from "../components/containers/TodoFormContainer";
import TodoListContainer from "../components/containers/TodoListContainer";
import HeaderContainer from "../components/containers/HeaderContainer";
import { useDispatch } from "react-redux";
import { authLoginAction } from "../store/actions/authActions";
import { toast } from "react-toastify";

import "./home.css";

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");

  useEffect(() => {
    if (token && tokenExpiration) {
      const remainingTime = parseInt(tokenExpiration) - Date.now(); // Calculate remaining time
      // Set timeout only if there is time left
      if (remainingTime > 0) {
        const timeoutId = setTimeout(() => {
          dispatch(authLoginAction.REJECTED("Token expired"));
          toast.error("Your session has expired. Please log in again.");
        }, remainingTime);

        // Cleanup function to clear timeout on unmount or when dependencies change
        return () => clearTimeout(timeoutId);
      }
    }
  }, [dispatch, token, tokenExpiration]);

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
