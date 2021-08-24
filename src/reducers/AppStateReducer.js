import {
  AUTHENTICATE_USER,
  AUTHENTICATED,
  AUTHENTICATION_FAILED,
  LOAD_USER_DATA_SUCCEEDED,
  LOAD_USER_DATA_FAILED,
  UNAUTHORIZED_REQUEST,
  LOAD_USER_DATA,
  LOAD_JOBS,
  LOAD_JOBS_SUCCEEDED,
  LOAD_JOBS_FAILED,
  CLEAR_LOAD_USER_FAILED_FLAG,
  CLEAR_LOAD_JOBS_FAILED_FLAG,
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCEEDED,
  UPLOAD_FILE_FAILED,
  GET_JOB_DETAILS,
  GET_JOB_DETAILS_SUCCEEDED,
  GET_JOB_DETAILS_FAILED, 
  CLEAR_LOAD_JOB_DETAILS_FAILED_FLAG,
  CLEAR_PRODUCT_IMPORT_SUCCESS_FLAG,
  CLEAR_UPLOAD_FILE_SUCCESS_FLAG,
  IMPORT_PRODUCT,
  IMPORT_PRODUCT_SUCCEEDED,
  IMPORT_PRODUCT_FAILED
} from '../actions';

const appStateReducer = (state = {
  isAuthenticating: false,
  isAuthenticationFailed: false,
  isAuthenticationSucceeded: false,
  isLoadingUser: false,
  isLoadUserFailed: false,
  isJobsLoading: false,
  isLoadJobsFailed: false,
  tokenExpired: false,
  isFileUploading: false,
  isFileUploadFailed: false,
  isFileUploadSucceeded: false,
  isLoadingJobDetails: false,
  isJobDetailsFailed: false,
  isImportingProduct: false,
  isProductImportSucceeded: false,
  isProductImportFailed: false,
  newJobId: ''
}, action) => {
  switch(action.type) {
    case AUTHENTICATE_USER:
      return {
        ...state,
        isAuthenticating: true,
        isAuthenticationFailed: false,
        isAuthenticationSucceeded: false
      }
      case AUTHENTICATED:
        return {
          ...state,
          isAuthenticationSucceeded: true,
          isAuthenticationFailed: false,
          isAuthenticating: false,
          tokenExpired: false
        }
    case AUTHENTICATION_FAILED:
      return {
        ...state,
        isAuthenticationFailed: true,
        isAuthenticating: false,
        isAuthenticationSucceeded: false
      }
    case LOAD_USER_DATA:
      return {
        ...state,
        isLoadingUser: true,
        isLoadUserFailed: false
      }
    case LOAD_USER_DATA_SUCCEEDED:
      return {
        ...state,
        isLoadingUser: false,
        isLoadUserFailed: false
      }
      case LOAD_USER_DATA_FAILED:
        return {
          ...state,
          isLoadingUser: false,
          isLoadUserFailed: true
        }
      case LOAD_JOBS:
        return {
          ...state,
          isJobsLoading: true,
          isLoadJobsFailed: false
        }
      case LOAD_JOBS_SUCCEEDED:
        return {
          ...state,
          isJobsLoading: false,
          isLoadJobsFailed: false
        }
      case LOAD_JOBS_FAILED:
        return {
          ...state,
          isJobsLoading: false,
          isLoadJobsFailed: true
        }
      case UNAUTHORIZED_REQUEST:
        return {
          ...state,
          tokenExpired: true
        }
      case CLEAR_LOAD_USER_FAILED_FLAG:
        return {
          ...state,
          isLoadUserFailed: false
        }
      case CLEAR_LOAD_JOBS_FAILED_FLAG:
        return {
          ...state,
          isLoadJobsFailed: false
        }
      case CLEAR_LOAD_JOB_DETAILS_FAILED_FLAG:
        return {
          ...state,
          isJobDetailsFailed: false
        }
      case UPLOAD_FILE:
        return {
          ...state,
          isFileUploading: true,
          isFileUploadFailed: false,
          isFileUploadSucceeded: false
        }
      case UPLOAD_FILE_SUCCEEDED:
        return {
          ...state,
          isFileUploading: false,
          isFileUploadFailed: false,
          isFileUploadSucceeded: true
        }
      case UPLOAD_FILE_FAILED:
        return {
          ...state,
          isFileUploading: false,
          isFileUploadFailed: true,
          isFileUploadSucceeded: false
        }
      case GET_JOB_DETAILS:
        return {
          ...state,
          isLoadingJobDetails: true,
          isJobDetailsFailed: false
        }
      case GET_JOB_DETAILS_SUCCEEDED:
        return {
          ...state,
          isLoadingJobDetails: false,
          isJobDetailsFailed: false
        }
      case GET_JOB_DETAILS_FAILED:
        return {
          ...state,
          isLoadingJobDetails: false,
          isJobDetailsFailed: true
        }
      case CLEAR_PRODUCT_IMPORT_SUCCESS_FLAG:
        return {
          ...state,
          isProductImportSucceeded: false
        }
      case CLEAR_UPLOAD_FILE_SUCCESS_FLAG:
        return {
          ...state,
          isFileUploadSucceeded: false
        }
      case IMPORT_PRODUCT:
        return {
          ...state,
          isImportingProduct: true,
          isProductImportFailed: false
        }
      case IMPORT_PRODUCT_SUCCEEDED:
        return {
          ...state,
          isImportingProduct: false,
          isProductImportSucceeded: true,
          isProductImportFailed: false,
          newJobId: action.jobId
        }
      case IMPORT_PRODUCT_FAILED:
        return {
          ...state,
          isImportingProduct: false,
          isProductImportSucceeded: false,
          isProductImportFailed: true
        }
    default:
      return state
  }
};

export default appStateReducer;