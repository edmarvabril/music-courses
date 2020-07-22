import ajax from './ajax';
import {API} from '../../../../constants/api';

export const getCompleted = ({token}) => {
  const url = `${API}/api/courses?status=completed`;
  return ajax(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getInProgress = ({token}) => {
  const url = `${API}/api/courses?status=in_progress`;
  return ajax(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getHome = ({token}) => {
  const url = `${API}/api/home`;
  return ajax(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllCourses = ({token}) => {
  const url = `${API}/api/courses?status=all`;
  return ajax(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCourseDetails = ({token, id}) => {
  const url = `${API}/api/courses/${id}`;
  return ajax(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};
