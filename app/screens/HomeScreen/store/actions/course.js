import {
  SELECT_COURSE,
  GET_HOME_REQUEST,
  GET_ALLCOURSES_REQUEST,
  GET_COURSEDETAILS_REQUEST,
  GET_INPROGRESS_REQUEST,
  GET_COMPLETED_REQUEST,
} from '../actionTypes';

export const getCompleted = data => ({
  type: GET_COMPLETED_REQUEST,
  data,
});

export const getInProgress = data => ({
  type: GET_INPROGRESS_REQUEST,
  data,
});

export const selectCourse = data => ({
  type: SELECT_COURSE,
  data,
});

export const getHome = data => ({
  type: GET_HOME_REQUEST,
  data,
});

export const getAllCourses = data => ({
  type: GET_ALLCOURSES_REQUEST,
  data,
});

export const getCourseDetails = data => ({
  type: GET_COURSEDETAILS_REQUEST,
  data,
});
