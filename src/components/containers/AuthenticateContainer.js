import { connect } from "react-redux";
import { authenticateUser } from "../../actions";
import Authentication from "../Authentication";

const mapStateToProps = ({
  appState: {
    isAuthenticating,
    isAuthenticationFailed,
    isAuthenticationSucceeded,
  },
}) => ({
  isAuthenticating,
  isAuthenticationFailed,
  isAuthenticationSucceeded,
});

const mapDispatchToProps = {
  authenticateUser,
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(Authentication);