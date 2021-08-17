import { connect } from "react-redux";
import JobsPage from "../JobsPage";

const mapStateToProps = ({
  appState: {
    isJobsLoading,
  },
  jobs: {
    allJobs
  }
}) => ({
  isJobsLoading,
  allJobs
});

// const mapDispatchToProps = {
//   authenticateUser,
// };

export default connect(
  mapStateToProps, null
)(JobsPage);