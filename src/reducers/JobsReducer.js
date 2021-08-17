import { LOAD_JOBS_SUCCEEDED } from "../actions";

const jobsReducer = (state = { allJobs: [], recentJobs: [] }, action) => {
  switch(action.type) {
    case LOAD_JOBS_SUCCEEDED:
      return {
        ...state,
        allJobs: action.jobs,
        recentJobs: action.jobs.slice(0, 10),
      }
    default:
      return state
  }
};

export default jobsReducer;