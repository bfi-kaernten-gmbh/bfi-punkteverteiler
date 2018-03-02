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
        // if request is good..
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token
        localStorage.setItem('token', res.data.token);
        // - redirect to the route '/feature'
        const {role, _id} = res.data;
        console.log(role);
        if(role !== 'admin') {
          callback(`/${role}/${_id}`);
        } else {
          callback(`/${role}`);
        }
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

const signoutUser = () => {
  localStorage.removeItem('token');
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
        dispatch({type: AUTH_USER})
        localStorage.setItem('token', res.data.token);
        callback(`/user/${res.data._id}`);
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
