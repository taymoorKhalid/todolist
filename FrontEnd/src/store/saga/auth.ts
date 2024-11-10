// sagas/authSaga.ts
import { put, takeEvery, call } from "redux-saga/effects";
import { authActionTypes } from "../../types/types";
import { toast } from "react-toastify";
import {
  authLoginAction,
  authLogoutAction,
  authSignupAction,
} from "../actions/auth";
import axios from "axios";

function* handleLogin(
  action: ReturnType<typeof authLoginAction.STARTED>
): Generator {
  try {
    const response: any = yield call(
      axios.post,
      "http://localhost:5000/api/users/login",
      action.payload
    );
    yield put(authLoginAction.FULLFILLED());
    toast.success(response.data.message);
    const existingExpiration = localStorage.getItem("tokenExpiration");
    const isExpirationValid =
      existingExpiration && Date.now() < parseInt(existingExpiration);

    // Only set a new expiration if there isn't a valid one already
    if (!isExpirationValid) {
      const newExpirationTime = Date.now() + 60 * 60 * 1000; // 1 hour
      localStorage.setItem("tokenExpiration", newExpirationTime.toString());
    }

    localStorage.setItem("token", response.data.token);
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Login failed! Please try again.";
    yield put(authLoginAction.REJECTED(error.message));
    toast.error(errorMessage);
  }
}

function* handleLogout(
  action: ReturnType<typeof authLogoutAction.STARTED>
): Generator {
  try {
    yield call([localStorage, "removeItem"], "token"); // Remove token from local storage
    yield call([localStorage, "removeItem"], "tokenExpiration");
    yield put(authLogoutAction.FULLFILLED()); // Dispatch success action
    toast.success("Logout successful!");
  } catch (error: any) {
    yield put(authLogoutAction.REJECTED(error.message)); // Dispatch failure action if an error occurs
    toast.error(error.message);
  }
}

function* handleSignup(
  action: ReturnType<typeof authSignupAction.STARTED>
): Generator {
  try {
    const response: any = yield axios.post(
      "http://localhost:5000/api/users/signup",
      action.payload
    );
    yield put(authSignupAction.FULLFILLED());
    toast.success(response.data.message);
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Signup failed! Please try again.";
    yield put(authSignupAction.REJECTED(errorMessage));
    toast.error(errorMessage);
  }
}

function* authSaga() {
  yield takeEvery(authActionTypes.LOGIN_REQUEST, handleLogin);
  yield takeEvery(authActionTypes.LOGOUT_REQUEST, handleLogout);
  yield takeEvery(authActionTypes.SIGNUP_REQUEST, handleSignup);
}

export default authSaga;
