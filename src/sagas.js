import 'regenerator-runtime/runtime';
import { put, takeLatest, call, all } from 'redux-saga/effects';

export function* load(action) {
  try {
    const data = 0;
    yield put({type: 'loadedfinish', data});
  } catch (e) {
    yield put({type: 'loadedfinish', data});
  }
}

/**
 * Root saga responsible for selecting which actions trigger other sagas
 */
function * rootSaga() {
  yield [
    takeLatest('LOAD', load)
  ];
}

export default rootSaga;