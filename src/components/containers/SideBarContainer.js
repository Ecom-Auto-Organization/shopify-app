import { connect } from "react-redux";
import { loadUserData, loadJobs, clearProductImportSuccessFlag, refreshUserData } from "../../actions";
import SideBar from "../SideBar";

const mapStateToProps = ({
  appState: {
    tokenExpired,
    isProductImportSucceeded
  },
  user: {
    activeJobCount
  }
}) => ({
  tokenExpired,
  activeJobCount,
  isProductImportSucceeded
});

const mapDispatchToProps = {
  loadUserData,
  loadJobs,
  clearProductImportSuccessFlag,
  refreshUserData
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(SideBar);