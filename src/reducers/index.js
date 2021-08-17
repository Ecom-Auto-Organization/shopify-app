import { combineReducers } from "redux";
import AppStateReducer from './AppStateReducer';
import JobsReducer from "./JobsReducer";
import UploadDetailsReducer from './UploadDetailsReducer';
import UserDetailsReducer from "./UserDetailsReducer";
import JobDetailsReducer from "./JobDetailsReducer";

/**
 *  Combine all reducers into a single application reducer.
 * 
 * @author Kwame Boateng
 */
export default combineReducers({
  appState: AppStateReducer,
  jobs: JobsReducer,
  user: UserDetailsReducer,
  uploadDetails: UploadDetailsReducer,
  jobDetails: JobDetailsReducer
});