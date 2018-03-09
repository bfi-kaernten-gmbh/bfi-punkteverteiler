import { ADD_USER, ERROR, SUCCESS } from '../actions/types'
import _ from 'lodash';

export default (state = { addedUsers: {} }, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, addedUsers: _.mapKeys(action.emails, '_id'), errorMessage: ''};
    case ERROR:
      return { ...state, errorMessage: action.message, successMessage: '' };
    case SUCCESS:
      return { ...state, successMessage: action.message, errorMessage: '' };
    default:
      return state;
  }
}
