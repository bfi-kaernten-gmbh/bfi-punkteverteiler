import axios from 'axios';

import {
  FETCH_USER,
  FETCH_USERLIST,
  UPDATE_USER,
  MULTISELECT,
  FILTER,
  TOGGLE_CHECKED,
  ADD_USER,
  ERROR,
  SUCCESS
} from './types';

import {ROOT_URL} from './';

// const jwt = localStorage.getItem('token');
// const REQUEST_OPTIONS = {
//   headers: {
//     authorization: localStorage.getItem('token')
//   }
// };

const requestOptions = () => {
  return {
    headers: {
      authorization: localStorage.getItem('token'),
    }
  }
}

function fetchUser(id) {
  const request = axios.get(`${ROOT_URL}/users/${id}`, requestOptions());
  return {
    type: FETCH_USER,
    payload: request
  }
}

function fetchUserList() {
  const request = axios.get(`${ROOT_URL}/users`, requestOptions());

  return {
    type: FETCH_USERLIST,
    payload: request
  }
}

function updateUser({ids, addPoints, description}) {
  return dispatch => {
    axios.patch(`${ROOT_URL}/users`, {
      ids,
      addPoints,
      description
    }, requestOptions()).then(res => {
      dispatch({
        type: UPDATE_USER,
        ids,
        addPoints
      })
      dispatch(successMessage('Die Punkte wurden erfolgreich hinzugefügt'));
    }).catch((e) => {
      console.log(e);
    });
  }
}


const multiselect = (id) => ({ type: MULTISELECT,id });

const filter = (value) => ({ type: FILTER, filter: value });

const toggleChecked = (id) => ({ type: TOGGLE_CHECKED, id });

export const addUsers = (emails) => {
  return dispatch => {
    axios.post(`${ROOT_URL}/users`, { emails }, requestOptions())
      .then((res) => {
        const { data: emails } = res;
        dispatch({
          type: ADD_USER,
          emails
        })
      })
      .catch((e) => {
        if(e.response.data.op) {
          dispatch(errorMessage(`The email "${e.response.data.op.email}" is already in use`));
        } else {
          dispatch(errorMessage('plese provide valid input'));
        }
      })
    ;
  }
}

export const errorMessage = (message) => ({
  type: ERROR,
  message
});

export const successMessage = (message) => ({
  type: SUCCESS,
  message
})

export {
  fetchUser,
  fetchUserList,
  updateUser,
  multiselect,
  filter,
  toggleChecked
}
