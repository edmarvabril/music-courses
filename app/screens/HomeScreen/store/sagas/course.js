import {takeLatest, call, put} from 'redux-saga/effects';

import {
  GET_HOME_FAILURE,
  GET_HOME_REQUEST,
  GET_HOME_SUCCESS,
  GET_ALLCOURSES_FAILURE,
  GET_ALLCOURSES_REQUEST,
  GET_ALLCOURSES_SUCCESS,
  GET_COURSEDETAILS_FAILURE,
  GET_COURSEDETAILS_REQUEST,
  GET_COURSEDETAILS_SUCCESS,
  GET_INPROGRESS_FAILURE,
  GET_INPROGRESS_REQUEST,
  GET_INPROGRESS_SUCCESS,
  GET_COMPLETED_FAILURE,
  GET_COMPLETED_REQUEST,
  GET_COMPLETED_SUCCESS,
} from '../actionTypes';
import {isArray, toNumber} from 'lodash';

import {
  getHome,
  getAllCourses,
  getCourseDetails,
  getInProgress,
  getCompleted,
} from '../api/course';

// fetch completed courses
function* getCompletedWorker(action) {
  try {
    const result = yield call(getCompleted, action.data);
    if (isArray(result)) {
      yield put({type: GET_COMPLETED_SUCCESS, payload: result});
    } else {
      yield put({type: GET_COMPLETED_FAILURE, payload: result});
    }
  } catch (error) {
    yield put({type: GET_COMPLETED_FAILURE});
  }
}

export function* getCompletedWatcher() {
  yield takeLatest(GET_COMPLETED_REQUEST, getCompletedWorker);
}

// fetch in-progress courses
function* getInProgressWorker(action) {
  try {
    const result = yield call(getInProgress, action.data);
    if (isArray(result)) {
      yield put({type: GET_INPROGRESS_SUCCESS, payload: result});
    } else {
      yield put({type: GET_INPROGRESS_FAILURE, payload: result});
    }
  } catch (error) {
    yield put({type: GET_INPROGRESS_FAILURE});
  }
}

export function* getInProgressWatcher() {
  yield takeLatest(GET_INPROGRESS_REQUEST, getInProgressWorker);
}

// fetch course details
function* getCourseDetailsWorker(action) {
  try {
    const result = yield call(getCourseDetails, action.data);
    if (result.title) {
      yield put({
        type: GET_COURSEDETAILS_SUCCESS,
        payload: {...result, id: toNumber(action.data.id)},
      });
    } else {
      yield put({type: GET_COURSEDETAILS_FAILURE, payload: result});
    }
  } catch (error) {
    yield put({type: GET_COURSEDETAILS_FAILURE});
  }
}

export function* getCourseDetailsWatcher() {
  yield takeLatest(GET_COURSEDETAILS_REQUEST, getCourseDetailsWorker);
}

// fetch all courses
function* getAllCoursesWorker(action) {
  try {
    const result = yield call(getAllCourses, action.data);
    if (isArray(result)) {
      yield put({type: GET_ALLCOURSES_SUCCESS, payload: result});
    } else {
      yield put({type: GET_ALLCOURSES_FAILURE, payload: result});
    }
  } catch (error) {
    yield put({type: GET_ALLCOURSES_FAILURE});
  }
}

export function* getAllCoursesWatcher() {
  yield takeLatest(GET_ALLCOURSES_REQUEST, getAllCoursesWorker);
}

// fetch recommended courses
function* getHomeWorker(action) {
  try {
    const result = yield call(getHome, action.data);
    if (result.recommended) {
      yield put({type: GET_HOME_SUCCESS, payload: result});
    } else {
      yield put({type: GET_HOME_FAILURE, payload: result});
    }
  } catch (error) {
    yield put({type: GET_HOME_FAILURE});
  }
}

export function* getHomeWatcher() {
  yield takeLatest(GET_HOME_REQUEST, getHomeWorker);
}
