// LoginContainer.tsx
import { connect } from "react-redux";
import Login from "../../pages/Login";
import { RootState } from "../../store/store";
import { authLoginAction } from "../../store/actions/auth";

const mapStateToProps = (state: RootState) => ({
  isLoading: state.auth.isLoading,
});

const mapDispatchToProps = (dispatch: any) => ({
  onLogin: (email: string, password: string) =>
    dispatch(authLoginAction.STARTED(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
