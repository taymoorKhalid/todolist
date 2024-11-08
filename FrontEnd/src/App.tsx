import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginContainer from "./components/containers/LoginContainer";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { authLoginAction } from "./store/actions/authActions";
import SignupContainer from "./components/containers/SignupContainer";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    const isTokenValid =
      token && tokenExpiration && Date.now() < parseInt(tokenExpiration);
    if (token && !isAuthenticated) {
      if (isTokenValid) {
        dispatch(authLoginAction.FULLFILLED());
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
        dispatch(authLoginAction.REJECTED("Token expired"));
      }
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Router>
      <ToastContainer autoClose={1000} />
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<LoginContainer />} />
            <Route path="/signup" element={<SignupContainer />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
