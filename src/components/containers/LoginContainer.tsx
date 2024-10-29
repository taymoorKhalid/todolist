// containers/LoginContainer.tsx
import { connect } from "react-redux";
import Login from "../../pages/Login";
import { authLoginAction } from "../../store/actions/authActions";

const mapDispatchToProps = (dispatch: any) => ({
  onLogin: () => dispatch(authLoginAction.STARTED()),
});

export default connect(null, mapDispatchToProps)(Login);
