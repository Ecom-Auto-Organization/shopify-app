const appStateReducer = (state = {
  totalJobs: 0,
  activeJobs: 0,
  isAuthenticating: false,
  isAuthenticationFailed: false,
  isAuthenticationSucceeded: false
}, action) => {
  switch(action.type) {
    default:
      return state
  }
};

export default appStateReducer;