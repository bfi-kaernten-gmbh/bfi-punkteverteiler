import _ from 'lodash';

import {
  FETCH_USER,
  FETCH_USERLIST,
  UPDATE_USER,
  MULTISELECT
} from '../actions/types';



export default function(state = {}, action) {
  switch(action.type) {
  case FETCH_USER:
    return { ...state, [action.payload.data._id]: action.payload.data }
  case FETCH_USERLIST:
    return _.mapKeys(action.payload.data, '_id');
  case UPDATE_USER:
    return {
      ...state
    };
  default:
    return state;
  }
}
