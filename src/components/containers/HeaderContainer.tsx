// containers/LoginContainer.tsx
import { connect } from "react-redux";
import { authLogoutAction } from "../../store/actions/authActions";
import Header from "../header";

const mapDispatchToProps = (dispatch: any) => ({
  onLogout: () => dispatch(authLogoutAction.STARTED()),
});

export default connect(null, mapDispatchToProps)(Header);
