import {get} from 'lodash';

import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGOUT,
} from '../actionTypes';

const initialState = {
  isRequesting: false,
  hasError: false,
  isAuthenticated: false,
  payload: {},
  accessToken: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isRequesting: true,
        hasError: false,
        isAuthenticated: false,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        isRequesting: false,
        hasError: true,
        payload: get(action, 'payload'),
        isAuthenticated: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        hasError: false,
        userInfo: get(action, 'payload'),
        isAuthenticated: true,
        accessToken: get(action, 'payload.token'),
      };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default auth;
