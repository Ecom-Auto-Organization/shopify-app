import { connect } from "react-redux";
import { clearLoadJobsFailedFlag, clearLoadUserFailedFlag, clearLoadJobDetailsFailedFlag } from "../../actions";
import ContentWrapper from "../ContentWrapper";

const mapStateToProps = ({
  appState: {
    isLoadUserFailed,
    isLoadJobsFailed,
    isJobDetailsFailed
  }
}) => ({
  isLoadUserFailed,
  isLoadJobsFailed,
  isJobDetailsFailed
});

const mapDispatchToProps = {
  clearLoadJobsFailedFlag, clearLoadUserFailedFlag, clearLoadJobDetailsFailedFlag
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(ContentWrapper);