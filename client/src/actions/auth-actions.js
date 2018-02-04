import axios from 'axios';

import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  SIGNIN_VALID
} from './types';

const ROOT_URL = 'http://4eab9682.ngrok.io';

const signinUser = ({ email, password }, callback) => {
  return dispatch => {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, {email, password})
      .then( res => {
        console.log(res.data);
        // if request is good..
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token
        localStorage.setItem('token', res.data.token);
        // - redirect to the route '/feature'
        const role = res.data;
        if(role !== 'admin') {
          callback(`/${res.data.role}/${res.data._id}`);
        } else {
          callback(`/${res.data.role}`);
        }
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

const validateSignup = (id) => {
  return dispatch => {
    axios.post(`${ROOT_URL}/validate/signup`, {id})
      .then((res) => {
        console.log(res);
        dispatch({
          type: SIGNIN_VALID,
          payload: res.data
        })
      })
      .catch(e => {
        dispatch({
          type: SIGNIN_VALID,
          payload: e.response.data
        });
      });
  }
}

export {
  signinUser,
  authError,
  signoutUser,
  validateSignup
}
