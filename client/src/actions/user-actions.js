import axios from 'axios';

import {
  FETCH_USER
} from './types';

export {
  fetchProfile
}

function fetchProfile() {
  const jwt = localStorage.getItem('token');
  const request = axios.get('http://localhost:3001/profile', {
    headers: {
      authorization: jwt
    }
  });

  return {
    type: FETCH_USER,
    payload: request
  }
}
