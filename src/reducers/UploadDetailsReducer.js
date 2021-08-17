import { UPLOAD_FILE_SUCCEEDED, RESET_UPLOAD_DETAILS } from "../actions";

const userDetailsReducer = (state = {}, action) => {
  switch(action.type) {
    case UPLOAD_FILE_SUCCEEDED:
      return action.uploadDetails;
    case RESET_UPLOAD_DETAILS:
      return {};
    default:
      return state
  }
};

export default userDetailsReducer;