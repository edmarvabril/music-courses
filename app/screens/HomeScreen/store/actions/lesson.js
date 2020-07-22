import {SELECT_LESSON, MARK_LESSONCOMPLETE_REQUEST} from '../actionTypes';

export const selectLesson = data => {
  return {
    type: SELECT_LESSON,
    data,
  };
};

export const markAsComplete = data => ({
  type: MARK_LESSONCOMPLETE_REQUEST,
  data,
});
