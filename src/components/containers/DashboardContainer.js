import { connect } from "react-redux";
import Dashboard from "../Dashboard";

const mapStateToProps = ({
  appState: {
    isLoadingUser,
    isJobsLoading,
  },
  user: {
    jobCount,
    activeJobCount,
  },
  jobs: {
    recentJobs
  }
}) => ({
  isLoadingUser,
  isJobsLoading,
  jobCount,
  activeJobCount,
  recentJobs
});

// const mapDispatchToProps = {
//   authenticateUser,
// };

export default connect(
  mapStateToProps, null
)(Dashboard);