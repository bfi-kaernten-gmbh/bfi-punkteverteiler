import axios from 'axios';

import {
  FETCH_USER,
  FETCH_USERLIST,
  UPDATE_USER
} from './types';

export {
  fetchUser,
  fetchUserList,
  updateUser
}

function fetchUser() {
  const request = axios.get('http://localhost:3001/users', {
    headers: {
      authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YTcxODU2ZWUxYjI0NjBlNjE5ZTgyMDYiLCJpYXQiOjE1MTczODkxNjY0Nzd9.e6lwuEK0vxm-t4LWz5pVkMwKnBl6NsluKuGEbiGwFH0"
    }
  });

  return {
    type: FETCH_USER,
    payload: request
  }
}

function fetchUserList() {
  const request = axios.get('http://localhost:3001/users', {
    headers: {
      authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YTcxODU2ZWUxYjI0NjBlNjE5ZTgyMDYiLCJpYXQiOjE1MTczODkxNjY0Nzd9.e6lwuEK0vxm-t4LWz5pVkMwKnBl6NsluKuGEbiGwFH0"
    }
  });

  return {
    type: FETCH_USERLIST,
    payload: request
  }
}

function updateUser(values, id, callback) {
   callback(values);
   return {
     type: UPDATE_USER,
     payload: values, id
   }
 }
