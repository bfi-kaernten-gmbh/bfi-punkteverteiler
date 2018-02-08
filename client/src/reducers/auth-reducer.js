import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, SIGNUP_VALID } from '../actions/types';

export default (state = {}, action) => {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true };
    case UNAUTH_USER:
      return { ...state, error: '', authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload }
    case SIGNUP_VALID: {
      return { ...state, signupValid: action.payload }
    }

    default:
      return state;
  }
}
