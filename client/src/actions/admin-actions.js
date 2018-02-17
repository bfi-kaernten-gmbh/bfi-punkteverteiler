import axios from 'axios';

import {
  FETCH_USER,
  FETCH_USERLIST,
  UPDATE_USER,
  MULTISELECT,
  FILTER,
  TOGGLE_CHECKED
} from './types';

import {ROOT_URL} from './';

const jwt = localStorage.getItem('token');
const REQUEST_OPTIONS = {
  headers: {
    authorization: jwt
  }
};

export {
  fetchUser,
  fetchUserList,
  updateUser,
  multiselect,
  filter,
  toggleChecked
}

function fetchUser(id) {
  const jwt = localStorage.getItem('token');
  const request = axios.get(`${ROOT_URL}/users/${id}`, {
    headers: {
      authorization: jwt
    }
  });
  console.log(request);
  return {
    type: FETCH_USER,
    payload: request
  }
}

function fetchUserList() {
  const jwt = localStorage.getItem('token');
  const request = axios.get(`${ROOT_URL}/users`, {
    headers: {
      authorization: jwt
    }
  });

  return {
    type: FETCH_USERLIST,
    payload: request
  }
}

function updateUser({ids, addPoints, description}, callback) {
  return dispatch => {
    axios.patch(`${ROOT_URL}/users`, {
      ids,
      addPoints,
      description
    }, REQUEST_OPTIONS).then(res => {
      console.log(res);
      dispatch({
        type: UPDATE_USER
      })
      callback()
    });
  }
}

function multiselect(id) {
  return {
    type: MULTISELECT,
    id,
  }
}

function filter(value) {
  return {
    type: FILTER,
    filter: value
  }
}

const toggleChecked = (id) => ({ type: TOGGLE_CHECKED, id });
