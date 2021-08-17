import { LOAD_USER_DATA_SUCCEEDED } from "../actions";

const userDetailsReducer = (state = {
  activeJobCount: 0,
  jobCount: 0,
}, action) => {
  switch(action.type) {
    case LOAD_USER_DATA_SUCCEEDED:
      return action.userDetails;
    default:
      return state
  }
};

export default userDetailsReducer;