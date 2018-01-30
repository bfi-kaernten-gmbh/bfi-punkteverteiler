import axios from 'axios';

import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from './types';

const ROOT_URL = 'http://dbaef1f6.ngrok.io';

const signinUser = ({ email, password }, callback) => {
  return dispatch => {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, {email, password})
      .then( res => {
        // if request is good..
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER })
        // - Save the JWT token
        localStorage.setItem('token', res.data.token);
        // - redirect to the route '/feature'
        callback(`/${res.data.role}`);
      })
      .catch((e) => {
        console.log(e);
        // if request is bad...
        // - Show an error to the user≈
        dispatch(authError('Bad Login Info'));
      });
  }
}

const authError = error => {
  console.log(error);
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


export {
  signinUser,
  authError,
  signoutUser
}
