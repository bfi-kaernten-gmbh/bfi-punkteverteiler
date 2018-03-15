import axios from 'axios';

import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  SIGNUP_VALID,
} from './types';

import {ROOT_URL, requestOptions} from './';
import {errorMessage, successMessage} from './message-actions';

export const signinUser = ({ username, password }, callback) => {
  return dispatch => {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, {username, password})
      .then( res => {
        let {role, _id, token} = res.data;
        if(role !== 'admin') {
          role = `user/${_id}`;
        }

        dispatch({ type: AUTH_USER, role });

        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        callback(`/${role}`);
      })
      .catch((e) => {
        dispatch(authError('Bad Login Info!'));
      });
  }
}

export const authError = error => {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export const signoutUser = (callback) => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  return {
    type: UNAUTH_USER
  };
}

export const validateSignup = (id) => {
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

export const signupUser = (newUser, id, callback) => {
  return dispatch => {
    axios.post(`${ROOT_URL}/signup/${id}`, newUser)
      .then((res) => {
        const { token, _id } = res.data;
        let role = `user/${_id}`;
        dispatch({type: AUTH_USER, role})
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        callback(`/${role}`);
      })
  }
}

export const changePassword = ({ password, newPassword }, callback) => dispatch => {
  axios.post(`${ROOT_URL}/password/change`, {password, newPassword}, requestOptions())
    .then((res) => {
      dispatch(successMessage(res.data));
      callback()
    })
    .catch((e) => {
      dispatch(errorMessage(e.response.data));
    })
  ;
}


export const forgotPassword = username => dispatch => {
  axios.post(`${ROOT_URL}/password/forgot`, {username})
    .then((res) => {
      dispatch(successMessage(res.data));
    })
    .catch(e => {
      console.log(e);
      dispatch(errorMessage('User does not exist.'));
    })
}

export const resetPassword = ({ token, newPassword }, callback) => dispatch => {
  console.log( {token, newPassword});
  axios.post(`${ROOT_URL}/password/reset`, {token, newPassword})
    .then((res) => {
      dispatch(successMessage(res.data))
      callback('/');
    })
    .catch(e => {
      console.log(e)
      dispatch(errorMessage(e.response.data));
    })
}
