// reducers/authReducer.ts
import { authActionTypes } from "../../types/types";

interface AuthState {
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  error: null,
};

const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case authActionTypes.LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, error: null };
    case authActionTypes.LOGIN_FAILURE:
      return { ...state, isAuthenticated: false, error: action.error };
    case authActionTypes.LOGOUT_SUCCESS:
      return { ...state, isAuthenticated: false, error: null };
    case authActionTypes.LOGOUT_FAILURE:
      return { ...state, isAuthenticated: true, error: action.error };
    default:
      return state;
  }
};

export default authReducer;
