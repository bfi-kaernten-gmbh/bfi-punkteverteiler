import axios from 'axios';

import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  SIGNUP_VALID
} from './types';

import {ROOT_URL} from './';

const signinUser = ({ username, password }, callback) => {
  return dispatch => {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, {username, password})
      .then( res => {
        let {role, _id, token} = res.data;
        if(role !== 'admin') {
          role = `user/${_id}`;
        }
        console.log(role);
        dispatch({ type: AUTH_USER, role });
        
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        callback(`/${role}`);
      })
      .catch((e) => {
        // if request is bad...
        // - Show an error to the user≈
        dispatch(authError('Bad Login Info'));
      });
  }
}

const authError = error => {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

const signoutUser = (callback) => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  return {
    type: UNAUTH_USER
  };
}

const validateSignup = (id) => {
  return dispatch => {
    axios.post(`${ROOT_URL}/validate/signup`, {id})
      .then((res) => {
        dispatch({
          type: SIGNUP_VALID,
          payload: res.data
        })
      })
      .catch(e => {;
        dispatch({
          type: SIGNUP_VALID,
          payload: {signupValid: 'error'}
        });
      });
  }
}

const signupUser = (newUser, id, callback) => {
  console.log(newUser);
  return dispatch => {
    axios.post(`${ROOT_URL}/signup/${id}`, newUser)
      .then((res) => {
        const { token, _id } = res.data;
        dispatch({type: AUTH_USER, role: `user/${_id}`})
        localStorage.setItem('token', token);
        callback(`/user/${_id}`);
      })
  }
}

export {
  signinUser,
  authError,
  signoutUser,
  validateSignup,
  signupUser
}
