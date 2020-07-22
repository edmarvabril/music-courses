import {LOGIN_REQUEST, LOGOUT} from '../actionTypes';

export const logIn = data => ({
  type: LOGIN_REQUEST,
  data,
});

export const logOut = () => ({
  type: LOGOUT,
});
