import {
  GET_MONTHENTRIES_REQUEST,
  GET_DAYS_REQUEST,
  SAVE_DAYS_REQUEST,
  SAVE_LOGTIME_REQUEST,
  DELETE_LOGTIME_REQUEST
} from '../actionTypes';

export const getMonthEntries = data => ({
  type: GET_MONTHENTRIES_REQUEST,
  data,
});

export const getDays = data => ({
  type: GET_DAYS_REQUEST,
  data,
});

export const saveDays = data => ({
  type: SAVE_DAYS_REQUEST,
  data,
});

export const saveLogTime = data => ({
  type: SAVE_LOGTIME_REQUEST,
  data,
});

export const deleteLogTime = data => ({
  type: DELETE_LOGTIME_REQUEST,
  data,
});
