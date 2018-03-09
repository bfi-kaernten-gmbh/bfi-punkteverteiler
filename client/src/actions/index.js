export * from './user-actions';
export * from './admin-actions';
export * from './auth-actions';
export * from './message-actions';

export const ROOT_URL = 'http://localhost:3001';
// export const ROOT_URL = 'https://digi-pass.herokuapp.com';

export const requestOptions = () => {
  return {
    headers: {
      authorization: localStorage.getItem('token'),
    }
  }
}
