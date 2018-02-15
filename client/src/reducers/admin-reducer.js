import { ADD_USER, ERROR } from '../actions/types'
import _ from 'lodash';

export default (state = { addedUsers: {} }, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, addedUsers: _.mapKeys(action.emails, '_id'), errorMessage: ''}
    case ERROR:
      return { ...state, errorMessage: action.message}
    default:
      return state;
  }
}
