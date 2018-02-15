import axios from 'axios';

import {
  FETCH_USER,
  FETCH_USERLIST,
  UPDATE_USER,
  ADD_USER
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
  updateUser
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
      ids: ids,
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

export const addUsers = (emails) => {
  return dispatch => {
    axios.post(`${ROOT_URL}/users`, { emails }, REQUEST_OPTIONS)
      .then((res) => {
        const { data: emails } = res;
        dispatch({
          type: ADD_USER,
          emails
        })
      })
      .catch((e) => {
        console.log(e);
      })
  }
}
