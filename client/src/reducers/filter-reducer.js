import {
  FILTER
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case FILTER:
    return action.filter;

    default:
      return state;
  }
}
