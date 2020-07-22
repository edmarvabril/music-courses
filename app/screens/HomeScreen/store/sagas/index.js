import {fork, all} from 'redux-saga/effects';

import {logInWatcher} from './auth';

import {
  getHomeWatcher,
  getAllCoursesWatcher,
  getCourseDetailsWatcher,
  getInProgressWatcher,
  getCompletedWatcher,
} from './course';

import {markAsCompleteWatcher} from './lesson';

import {
  getMonthEntriesWatcher,
  getDaysWatcher,
  saveDaysWatcher,
  saveLogTimeWatcher,
  deleteLogTimeWatcher,
} from './practice';

function* rootSaga() {
  yield all([
    fork(logInWatcher),
    fork(getHomeWatcher),
    fork(getAllCoursesWatcher),
    fork(getCourseDetailsWatcher),
    fork(markAsCompleteWatcher),
    fork(getMonthEntriesWatcher),
    fork(getDaysWatcher),
    fork(saveDaysWatcher),
    fork(saveLogTimeWatcher),
    fork(deleteLogTimeWatcher),
    fork(getInProgressWatcher),
    fork(getCompletedWatcher),
  ]);
}

export default rootSaga;
