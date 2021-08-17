import { connect } from "react-redux";
import { getJobDetails } from "../../actions";
import JobDetails from '../JobDetails'

const mapStateToProps = ({
  appState: {
    isLoadingJobDetails,
  },
  jobDetails,
  user: {
    shopDomain
  }
}) => ({
  isLoadingJobDetails,
  jobDetails,
  shopDomain
});

const mapDispatchToProps = {
  getJobDetails,
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(JobDetails);