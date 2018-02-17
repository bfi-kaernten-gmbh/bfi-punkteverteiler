import {
  FILTER,
} from '../actions/types';

export default function(state = {by: 'username'}, action) {
  switch(action.type) {
    case FILTER:
      return { ...state, input: action.filter};
    case 'filter_by':
      return { ...state, by: action.by }
    default:
      return state;
  }
}
