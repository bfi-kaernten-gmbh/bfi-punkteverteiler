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
  return {
    type: FETCH_USER,
    payload: ''
  }
}

function fetchUserList() {
  return {
    type: FETCH_USERLIST,
    payload: ''
  }
}

function updateUser(values, id, callback) {
   callback(values);
   return {
     type: UPDATE_USER,
     payload: values, id
   }
 }
