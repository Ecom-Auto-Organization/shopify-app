import { GET_JOB_DETAILS_SUCCEEDED } from "../actions";

const jobDetailsReducer = (state = {}, action) => {
  switch(action.type) {
    case GET_JOB_DETAILS_SUCCEEDED:
      return action.jobDetails;
    default:
      return state
  }
};

export default jobDetailsReducer;