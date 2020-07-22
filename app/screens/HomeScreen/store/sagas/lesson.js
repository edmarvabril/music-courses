import {takeLatest, call, put} from 'redux-saga/effects';

import {
  MARK_LESSONCOMPLETE_FAILURE,
  MARK_LESSONCOMPLETE_REQUEST,
  MARK_LESSONCOMPLETE_SUCCESS,
} from '../actionTypes';

import {markAsComplete} from '../api/lesson';

function* markAsCompleteWorker(action) {
  try {
    const result = yield call(markAsComplete, action.data);
    if (result) {
      yield put({type: MARK_LESSONCOMPLETE_SUCCESS, payload: result});
    } else {
      yield put({type: MARK_LESSONCOMPLETE_FAILURE, payload: result});
    }
  } catch (error) {
    yield put({type: MARK_LESSONCOMPLETE_FAILURE});
  }
}

export function* markAsCompleteWatcher() {
  yield takeLatest(MARK_LESSONCOMPLETE_REQUEST, markAsCompleteWorker);
}
