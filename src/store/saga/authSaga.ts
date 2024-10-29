// sagas/authSaga.ts
import { put, takeEvery } from "redux-saga/effects";
import { authActionTypes } from "../../types/types";
import { authLoginAction, authLogoutAction } from "../actions/authActions";

// Mocked API login function (you would replace this with your actual login API call)
function* handleLogin(action: any) {
  try {
    yield put(authLoginAction.FULLFILLED());
  } catch (error: any) {
    yield put(authLoginAction.REJECTED(error.message));
  }
}

function* handleLogout() {
  try {
    yield put(authLogoutAction.FULLFILLED());
  } catch (error: any) {
    yield put(authLogoutAction.REJECTED(error.message));
  }
}

function* authSaga() {
  yield takeEvery(authActionTypes.LOGIN_REQUEST, handleLogin);
  yield takeEvery(authActionTypes.LOGOUT_REQUEST, handleLogout);
}

export default authSaga;
