import 'regenerator-runtime/runtime';
import { put, takeLatest, call, all } from 'redux-saga/effects';
import { HttpCodes } from './utils';
import {
  AUTHENTICATE_USER,
  AUTHENTICATED,
  AUTHENTICATION_FAILED,
  LOAD_USER_DATA,
  LOAD_USER_DATA_SUCCEEDED,
  LOAD_USER_DATA_FAILED,
  UNAUTHORIZED_REQUEST,
  LOAD_JOBS,
  LOAD_JOBS_SUCCEEDED,
  LOAD_JOBS_FAILED,
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCEEDED,
  UPLOAD_FILE_FAILED,
  GET_JOB_DETAILS,
  GET_JOB_DETAILS_SUCCEEDED,
  GET_JOB_DETAILS_FAILED,
  REFRESH_USER_DATA,
  IMPORT_PRODUCT,
  IMPORT_PRODUCT_SUCCEEDED,
  IMPORT_PRODUCT_FAILED
} from './actions';
import ProductManagerAPI from './service';

export function* authenticate(action) {
  try {
    yield call(ProductManagerAPI.authenticateUser, action.userId);
    yield put({ type: AUTHENTICATED })
  } catch (e) {
    yield put({ type: AUTHENTICATION_FAILED })
  }
}

export function* getUserDetails() {
  try {
    const reply = yield call(ProductManagerAPI.getUserDetails);
    if (reply) {
      yield put({ type: LOAD_USER_DATA_SUCCEEDED, userDetails: reply })
    } else {
      yield put({ type: LOAD_USER_DATA_FAILED })
    }
  } catch (e) {
    if (e.response && (e.response.status == HttpCodes.AUTHENTICATED || e.response.status == HttpCodes.FORBIDDEN)) {
      yield put({ type: UNAUTHORIZED_REQUEST })
    } else {
      yield put({ type: LOAD_USER_DATA_FAILED })
    }
  }
}

export function* getJobs() {
  try {
    const reply = yield call(ProductManagerAPI.getJobs);
    if (reply) {
      yield put({ type: LOAD_JOBS_SUCCEEDED, jobs: reply })
    } else {
      yield put({ type: LOAD_JOBS_FAILED })
    }
  } catch (e) {
    if ( e.response && (e.response.status == HttpCodes.UNAUTHORIZED || e.response.status == HttpCodes.FORBIDDEN)) {
      yield put({ type: UNAUTHORIZED_REQUEST })
    } else {
      yield put({ type: LOAD_JOBS_FAILED })
    }
  }
}

export function* getJobDetails(action) {
  try {
    const reply = yield call(ProductManagerAPI.getJobDetails, action.jobId);
    if (reply) {
      yield put({ type: GET_JOB_DETAILS_SUCCEEDED, jobDetails: reply })
    } else {
      yield put({ type: GET_JOB_DETAILS_FAILED })
    }
  } catch (e) {
    if ( e.response && (e.response.status == HttpCodes.UNAUTHORIZED || e.response.status == HttpCodes.FORBIDDEN)) {
      yield put({ type: UNAUTHORIZED_REQUEST })
    } else {
      yield put({ type: GET_JOB_DETAILS_FAILED })
    }
  }
}

export function* uploadFile(action) {
  try {
    const reply = yield call(ProductManagerAPI.uploadFile, action.formData);
    if (reply) {
      yield put({ type: UPLOAD_FILE_SUCCEEDED, uploadDetails: reply })
    } else {
      yield put({ type: UPLOAD_FILE_FAILED })
    }
  } catch (e) {
    if ( e.response && (e.response.status == HttpCodes.UNAUTHORIZED || e.response.status == HttpCodes.FORBIDDEN)) {
      yield put({ type: UNAUTHORIZED_REQUEST })
    } else {
      yield put({ type: UPLOAD_FILE_FAILED })
    }
  }
}

export function* refreshUserData() {
  try {
    const userReply = yield call(ProductManagerAPI.getUserDetails);
    const jobsReply = yield call(ProductManagerAPI.getJobs);

    yield all([
      put({ type: LOAD_USER_DATA_SUCCEEDED, userDetails: userReply }),
      put({ type: LOAD_JOBS_SUCCEEDED, jobs: jobsReply })
    ])
  } catch (e) {
    if (e.response && (e.response.status == HttpCodes.AUTHENTICATED || e.response.status == HttpCodes.FORBIDDEN)) {
      yield put({ type: UNAUTHORIZED_REQUEST })
    }
  }
}

export function* importProduct(action) {
  try {
    const reply = yield call(ProductManagerAPI.importProduct, action.taskType, action.fileId, action.options, action.fileColumnDetails);
    if (reply) {
      yield put({ type: IMPORT_PRODUCT_SUCCEEDED, jobId: reply.jobId })
    } else {
      yield put({ type: IMPORT_PRODUCT_FAILED })
    }
  } catch (e) {
    if (e.response && (e.response.status == HttpCodes.AUTHENTICATED || e.response.status == HttpCodes.FORBIDDEN)) {
      yield put({ type: UNAUTHORIZED_REQUEST })
    } else {
      yield put({ type: IMPORT_PRODUCT_FAILED })
    }
  }
}

/**
 * Root saga responsible for selecting which actions trigger other sagas
 */
function * rootSaga() {
  yield takeLatest(AUTHENTICATE_USER, authenticate)
  yield takeLatest(LOAD_USER_DATA, getUserDetails)
  yield takeLatest(LOAD_JOBS, getJobs)
  yield takeLatest(UPLOAD_FILE, uploadFile)
  yield takeLatest(GET_JOB_DETAILS, getJobDetails)
  yield takeLatest(REFRESH_USER_DATA, refreshUserData)
  yield takeLatest(IMPORT_PRODUCT, importProduct)
}

export default rootSaga;