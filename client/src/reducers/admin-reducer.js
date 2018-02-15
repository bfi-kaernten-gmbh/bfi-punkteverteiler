import { ADD_USER } from '../actions/types'
import _ from 'lodash';

export default (state = { addedUsers: {} }, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, addedUsers: _.mapKeys(action.emails, '_id')}
    default:
      return state;

  }
}
