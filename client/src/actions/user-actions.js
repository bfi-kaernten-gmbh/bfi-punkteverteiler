import axios from 'axios';

import {
  FETCH_USER
} from './types';
import { ROOT_URL } from './'
export {
  fetchProfile
}

function fetchProfile() {
  const jwt = localStorage.getItem('token');
  const request = axios.get(`${ROOT_URL}/profile`, {
    headers: {
      authorization: jwt
    }
  });

  return {
    type: FETCH_USER,
    payload: request
  }
}
