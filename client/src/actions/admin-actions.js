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
  const jwt = localStorage.getItem('token');
  const request = axios.get('http://localhost:3001/users', {
    headers: {
      authorization: jwt
    }
  });

  return {
    type: FETCH_USER,
    payload: request
  }
}

function fetchUserList() {
  const jwt = localStorage.getItem('token');
  const request = axios.get('http://localhost:3001/users', {
    headers: {
      authorization: jwt
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
