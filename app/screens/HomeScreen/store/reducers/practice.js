import {get} from 'lodash';

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

const initialState = {
  isFetching: false,
  hasError: false,
  payload: {},
  dates: [],
  days: [],
  requesting: false,
  requestSuccessful: false,
};

const practice = (state = initialState, action) => {
  switch (action.type) {
    case GET_MONTHENTRIES_REQUEST:
    case GET_DAYS_REQUEST:
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };

    case SAVE_DAYS_REQUEST:
    case SAVE_LOGTIME_REQUEST:
    case DELETE_LOGTIME_REQUEST:
      return {
        ...state,
        requesting: true,
      };

    case GET_MONTHENTRIES_FAILURE:
    case GET_DAYS_FAILURE:
      return {
        ...state,
        isFetching: false,
        hasError: true,
        payload: get(action, 'payload'),
      };

    case SAVE_DAYS_FAILURE:
    case SAVE_LOGTIME_FAILURE:
    case DELETE_LOGTIME_FAILURE:
      return {
        ...state,
        requesting: false,
        requestSuccessful: false,
        payload: get(action, 'payload'),
      };

    case GET_MONTHENTRIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasError: false,
        dates: get(action, 'payload'),
      };

    case GET_DAYS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasError: false,
        days: get(action, 'payload'),
      };

    case SAVE_DAYS_SUCCESS:
    case SAVE_LOGTIME_SUCCESS:
    case DELETE_LOGTIME_SUCCESS:
      return {
        ...state,
        requesting: false,
        requestSuccessful: true,
        payload: get(action, 'payload'),
      };

    default:
      return state;
  }
};

export default practice;
