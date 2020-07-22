import {takeLatest, call, put} from 'redux-saga/effects';

import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS} from '../actionTypes';

import {logIn} from '../api/auth';

function* logInWorker(action) {
  try {
    const result = yield call(logIn, action.data);
    if (result.token) {
      yield put({type: LOGIN_SUCCESS, payload: result});
    } else {
      yield put({type: LOGIN_FAILURE, payload: result});
    }
  } catch (error) {
    yield put({type: LOGIN_FAILURE});
  }
}

export function* logInWatcher() {
  yield takeLatest(LOGIN_REQUEST, logInWorker);
}
