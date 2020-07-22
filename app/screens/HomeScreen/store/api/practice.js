import ajax from './ajax';
import {API} from '../../../../constants/api';

export const getMonthEntries = ({token, date}) => {
  const url = `${API}/api/get_entries_for_month`;
  return ajax(url, {
    method: 'POST',
    body: JSON.stringify({date}), // YYYY-MM-DD
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDays = ({token}) => {
  const url = `${API}/api/get_days`;
  return ajax(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const saveDays = ({token, data}) => {
  const url = `${API}/api/save_days`;
  return ajax(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const saveLogTime = ({token, data}) => {
  const url = `${API}/api/save-log-time`;
  return ajax(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteLogTime = ({token, data}) => {
  const url = `${API}/api/del_logs`;
  return ajax(url, {
    method: 'POST',
    body: JSON.stringify(data), // { id: entryId }
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};