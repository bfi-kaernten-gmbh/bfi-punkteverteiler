import _ from 'lodash';

import {
  FETCH_USER,
  FETCH_USERLIST,
  UPDATE_USER,
  TOGGLE_CHECKED
} from '../actions/types';



export default function(state = {}, action) {
  switch(action.type) {
  case FETCH_USER:
    return { ...state, [action.payload.data._id]: {...action.payload.data} };
  case TOGGLE_CHECKED:
    const { id } = action;
    return { ...state, [id]: { ...state[id], checked: state[id].checked ? !state[id].checked : true } };
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
