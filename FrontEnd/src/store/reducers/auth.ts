// reducers/authReducer.ts
import { authActionTypes } from "../../types/types";

interface AuthState {
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  error: null,
  isLoading: false,
};

const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case authActionTypes.LOGIN_REQUEST:
      return { ...state, isLoading: true, error: null };

    case authActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case authActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    case authActionTypes.LOGOUT_REQUEST:
      return { ...state, isLoading: true, error: null };

    case authActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case authActionTypes.LOGOUT_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case authActionTypes.SIGNUP_REQUEST:
      return { ...state, isLoading: true, error: null };

    case authActionTypes.SIGNUP_SUCCESS:
      return { ...state, isLoading: false, error: null };

    case authActionTypes.SIGNUP_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export default authReducer;
