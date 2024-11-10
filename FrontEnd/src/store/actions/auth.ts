import { authActionTypes } from "../../types/types";

export const authLoginAction = {
  STARTED: (email: string, password: string) => ({
    type: authActionTypes.LOGIN_REQUEST,
    payload: { email, password },
  }),
  FULLFILLED: () => ({
    type: authActionTypes.LOGIN_SUCCESS,
  }),
  REJECTED: (error: string) => ({
    type: authActionTypes.LOGIN_FAILURE,
    payload: error,
  }),
};

export const authLogoutAction = {
  STARTED: () => ({
    type: authActionTypes.LOGOUT_REQUEST,
  }),
  FULLFILLED: () => ({
    type: authActionTypes.LOGOUT_SUCCESS,
  }),
  REJECTED: (error: string) => ({
    type: authActionTypes.LOGOUT_FAILURE,
    payload: error,
  }),
};

export const authSignupAction = {
  STARTED: (data: { email: string; password: string }) => ({
    type: authActionTypes.SIGNUP_REQUEST,
    payload: data,
  }),
  FULLFILLED: () => ({
    type: authActionTypes.SIGNUP_SUCCESS,
  }),
  REJECTED: (error: string) => ({
    type: authActionTypes.SIGNUP_FAILURE,
    payload: error,
  }),
};
