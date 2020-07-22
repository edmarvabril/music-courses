import ajax from './ajax';
import {API} from '../../../../constants/api';

export const markAsComplete = ({lessonId, token}) => {
  const url = `${API}/api/lessons/${lessonId}/markComplete`;
  return ajax(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};
