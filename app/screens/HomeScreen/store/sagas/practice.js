import {takeLatest, call, put} from 'redux-saga/effects';
import {isArray} from 'lodash';

import {
  GET_MONTHENTRIES_FAILURE,
  GET_MONTHENTRIES_REQUEST,
  GET_MONTHENTRIES_SUCCESS,
  GET_DAYS_FAILURE,
  GET_DAYS_REQUEST,
  GET_DAYS_SUCCESS,
  SAVE_DAYS_FAILURE,
  SAVE_DAYS_REQUEST,
  SAVE_DAYS_SUCCESS,
  SAVE_LOGTIME_FAILURE,
  SAVE_LOGTIME_REQUEST,
  SAVE_LOGTIME_SUCCESS,
  DELETE_LOGTIME_FAILURE,
  DELETE_LOGTIME_REQUEST,
  DELETE_LOGTIME_SUCCESS,
} from '../actionTypes';

import {
  getMonthEntries,
  getDays,
  saveDays,
  saveLogTime,
  deleteLogTime,
} from '../api/practice';

// delete log time
function* deleteLogTimeWorker(action) {
  try {
    const result = yield call(deleteLogTime, action.data);
    if (result.result) {
      yield put({type: DELETE_LOGTIME_SUCCESS, payload: result});
    } else {
      yield put({type: DELETE_LOGTIME_FAILURE, payload: result});
    }
  } catch (error) {
    yield put({type: DELETE_LOGTIME_FAILURE});
  }
}

export function* deleteLogTimeWatcher() {
  yield takeLatest(DELETE_LOGTIME_REQUEST, deleteLogTimeWorker);
}

// save log time
function* saveLogTimeWorker(action) {
  try {
    const result = yield call(saveLogTime, action.data);
    if (result.success) {
      yield put({type: SAVE_LOGTIME_SUCCESS, payload: result});
    } else {
      yield put({type: SAVE_LOGTIME_FAILURE, payload: result});
    }
  } catch (error) {
    yield put({type: SAVE_LOGTIME_FAILURE});
  }
}

export function* saveLogTimeWatcher() {
  yield takeLatest(SAVE_LOGTIME_REQUEST, saveLogTimeWorker);
}

// save days
function* saveDaysWorker(action) {
  try {
    const result = yield call(saveDays, action.data);
    if (result.success) {
      yield put({type: SAVE_DAYS_SUCCESS, payload: result});
    } else {
      yield put({type: SAVE_DAYS_FAILURE, payload: result});
    }
  } catch (error) {
    yield put({type: SAVE_DAYS_FAILURE});
  }
}

export function* saveDaysWatcher() {
  yield takeLatest(SAVE_DAYS_REQUEST, saveDaysWorker);
}

// get days
function* getDaysWorker(action) {
  try {
    const result = yield call(getDays, action.data);
    if (isArray(result)) {
      yield put({type: GET_DAYS_SUCCESS, payload: result});
    } else {
      yield put({type: GET_DAYS_FAILURE, payload: result});
    }
  } catch (error) {
    yield put({type: GET_DAYS_FAILURE});
  }
}

export function* getDaysWatcher() {
  yield takeLatest(GET_DAYS_REQUEST, getDaysWorker);
}

// get entries for the given month
function* getMonthEntriesWorker(action) {
  try {
    const result = yield call(getMonthEntries, action.data);
    if (isArray(result)) {
      yield put({type: GET_MONTHENTRIES_SUCCESS, payload: result});
    } else {
      yield put({type: GET_MONTHENTRIES_FAILURE, payload: result});
    }
  } catch (error) {
    yield put({type: GET_MONTHENTRIES_FAILURE});
  }
}

export function* getMonthEntriesWatcher() {
  yield takeLatest(GET_MONTHENTRIES_REQUEST, getMonthEntriesWorker);
}
