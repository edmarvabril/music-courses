import ajax from './ajax';
import {API} from '../../../../constants/api';

export const logIn = data => {
  const url = `${API}/jwt-auth/v1/token`;
  return ajax(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
