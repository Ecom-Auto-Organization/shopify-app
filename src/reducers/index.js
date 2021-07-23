import { combineReducers } from "redux";
import AppStateReducer from './AppStateReducer';
import JobsReducer from "./JobsReducer";
import UserDetailsReducer from "./UserDetailsReducer";

/**
 *  Combine all reducers into a single application reducer.
 * 
 * @author Kwame Boateng
 */
export default combineReducers({
  appState: AppStateReducer,
  jobs: JobsReducer,
  user: UserDetailsReducer,
});