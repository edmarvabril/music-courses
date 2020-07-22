import {get} from 'lodash';

import {
  SELECT_COURSE,
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

const initialState = {
  selectedCourse: {},
  recommended: [],
  continueLearning: [],
  onboard: {},
  isFetching: false,
  hasError: false,
  payload: {},
  allCourses: [],
  courseInfo: {},
  inProgress: [],
  completed: [],
};

const course = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_COURSE:
      return {
        ...state,
        selectedCourse: get(action, 'data'),
      };

    case GET_HOME_REQUEST:
    case GET_ALLCOURSES_REQUEST:
    case GET_COURSEDETAILS_REQUEST:
    case GET_INPROGRESS_REQUEST:
    case GET_COMPLETED_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case GET_HOME_FAILURE:
    case GET_ALLCOURSES_FAILURE:
    case GET_COURSEDETAILS_FAILURE:
    case GET_INPROGRESS_FAILURE:
    case GET_COMPLETED_FAILURE:
      return {
        ...state,
        isFetching: false,
        hasError: true,
        payload: get(action, 'payload'),
      };

    case GET_HOME_SUCCESS:
      return {
        ...state,
        hasError: false,
        isFetching: false,
        recommended: get(action, 'payload.recommended', []),
        continueLearning: get(action, 'payload.continue_learning', []),
        onboard: get(action, 'payload.onboard', {}),
      };

    case GET_ALLCOURSES_SUCCESS:
      return {
        ...state,
        hasError: false,
        isFetching: false,
        allCourses: get(action, 'payload'),
      };

    case GET_INPROGRESS_SUCCESS:
      return {
        ...state,
        hasError: false,
        isFetching: false,
        inProgress: get(action, 'payload'),
      };

    case GET_COMPLETED_SUCCESS:
      return {
        ...state,
        hasError: false,
        isFetching: false,
        completed: get(action, 'payload'),
      };

    case GET_COURSEDETAILS_SUCCESS:
      return {
        ...state,
        hasError: false,
        isFetching: false,
        courseInfo: get(action, 'payload'),
      };

    default:
      return state;
  }
};

export default course;
