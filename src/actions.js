export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export const AUTHENTICATED = 'AUTHENTICATED';
export const AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED';
export const LOAD_USER_DATA = 'LOAD_USER_DATA';
export const LOAD_USER_DATA_SUCCEEDED = 'LOAD_USER_DATA_SUCCEEDED';
export const LOAD_USER_DATA_FAILED = 'LOAD_USER_DATA_FAILED';
export const UNAUTHORIZED_REQUEST = 'UNAUTHORIZED_REQUEST';
export const LOAD_JOBS = 'LOAD_JOBS';
export const LOAD_JOBS_SUCCEEDED = 'LOAD_JOBS_SUCCEEDED';
export const LOAD_JOBS_FAILED = 'LOAD_JOBS_FAILED';
export const CLEAR_LOAD_JOBS_FAILED_FLAG = 'CLEAR_LOAD_JOBS_FAILED_FLAG';
export const CLEAR_LOAD_USER_FAILED_FLAG = 'CLEAR_LOAD_USER_FAILED_FLAG';
export const UPLOAD_FILE = 'UPLOAD_FILE';
export const UPLOAD_FILE_SUCCEEDED = 'UPLOAD_FILE_SUCCEEDED';
export const UPLOAD_FILE_FAILED = 'UPLOAD_FILE_FAILED';
export const RESET_UPLOAD_DETAILS = 'RESET_UPLOAD_DETAILS';
export const GET_JOB_DETAILS = 'GET_JOB_DETAILS';
export const GET_JOB_DETAILS_SUCCEEDED = 'GET_JOB_DETAILS_SUCCEEDED';
export const GET_JOB_DETAILS_FAILED = 'GET_JOB_DETAILS_FAILED';
export const CLEAR_LOAD_JOB_DETAILS_FAILED_FLAG = 'CLEAR_LOAD_JOB_DETAILS_FAILED_FLAG';
export const CLEAR_PRODUCT_IMPORT_SUCCESS_FLAG = 'CLEAR_PRODUCT_IMPORT_SUCCESS_FLAG';
export const REFRESH_USER_DATA = 'REFRESH_USER_DATA';
export const IMPORT_PRODUCT = 'IMPORT_PRODUCT'
export const IMPORT_PRODUCT_SUCCEEDED = 'IMPORT_PRODUCT_SUCCEEDED'
export const IMPORT_PRODUCT_FAILED = 'IMPORT_PRODUCT_FAILED'

export function authenticateUser(userId) {
  return {
    type: AUTHENTICATE_USER,
    userId
  };
}

export function loadUserData() {
  return {
    type: LOAD_USER_DATA
  }; 
}

export function loadJobs() {
  return {
    type: LOAD_JOBS
  }; 
}

export function clearLoadUserFailedFlag() {
  return {
    type: CLEAR_LOAD_USER_FAILED_FLAG
  };
}

export function clearLoadJobsFailedFlag() {
  return {
    type: CLEAR_LOAD_JOBS_FAILED_FLAG
  };
}

export function clearLoadJobDetailsFailedFlag() {
  return {
    type: CLEAR_LOAD_JOB_DETAILS_FAILED_FLAG
  };
}

export function clearProductImportSuccessFlag() {
  return {
    type: CLEAR_PRODUCT_IMPORT_SUCCESS_FLAG
  };
}


export function uploadFile(formData) {
  return {
    type: UPLOAD_FILE,
    formData
  };
}

export function resetUploadDetails() {
  return {
    type: RESET_UPLOAD_DETAILS
  };
}

export function getJobDetails(jobId) {
  return {
    type: GET_JOB_DETAILS,
    jobId
  }; 
}

export function refreshUserData() {
  return {
    type: REFRESH_USER_DATA
  }; 
}

export function importProduct(taskType, fileId, options, fileColumnDetails) {
  return {
    type: IMPORT_PRODUCT,
    taskType,
    fileId,
    options,
    fileColumnDetails
  };
}