import {get} from 'lodash';

import {
  SELECT_LESSON,
  MARK_LESSONCOMPLETE_FAILURE,
  MARK_LESSONCOMPLETE_REQUEST,
  MARK_LESSONCOMPLETE_SUCCESS,
} from '../actionTypes';

const initialState = {
  moduleId: {},
  selectedLessonId: {},
  payload: {},
  requesting: false,
  hasError: false,
};

const lesson = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_LESSON:
      return {
        ...state,
        moduleId: get(action, 'data.moduleId'),
        selectedLessonId: get(action, 'data.lessonId'),
      };

    case MARK_LESSONCOMPLETE_REQUEST:
      return {
        ...state,
        requesting: true,
        hasError: false,
      };

    case MARK_LESSONCOMPLETE_FAILURE:
      return {
        ...state,
        requesting: false,
        hasError: true,
        payload: get(action, 'payload'),
      };

    case MARK_LESSONCOMPLETE_SUCCESS:
      return {
        ...state,
        requesting: false,
        hasError: false,
        payload: get(action, 'payload'),
      };

    default:
      return state;
  }
};

export default lesson;
