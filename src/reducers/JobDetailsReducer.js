import { GET_JOB_DETAILS_SUCCEEDED, GET_JOB_DETAILS_FAILED } from "../actions";

const jobDetailsReducer = (state = {}, action) => {
  switch(action.type) {
    case GET_JOB_DETAILS_SUCCEEDED:
      return action.jobDetails;
    case GET_JOB_DETAILS_FAILED:
      return {};
    default:
      return state
  }
};

export default jobDetailsReducer;