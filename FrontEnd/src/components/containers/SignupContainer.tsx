// containers/SignupContainer.tsx
import { connect } from "react-redux";
import Signup from "../../pages/Signup"; // Replace with the path to your Signup component
import { authSignupAction } from "../../store/actions/authActions";
import { RootState } from "../../store/store";

const mapStateToProps = (state: RootState) => ({
  isLoading: state.auth.isLoading,
});

const mapDispatchToProps = (dispatch: any) => ({
  onSignup: (data: { email: string; password: string }) =>
    dispatch(authSignupAction.STARTED(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
