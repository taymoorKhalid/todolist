import { authActionTypes } from "../../types/types";

export const authLoginAction = {
  STARTED: () => ({
    type: authActionTypes.LOGIN_REQUEST,
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
