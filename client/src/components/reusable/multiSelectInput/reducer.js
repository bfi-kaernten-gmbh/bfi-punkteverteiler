import _ from 'lodash';


import {
  TAG,
  TAG_INPUT,
  HANDLE_INPUT,
} from './actions';

export default (state = {tags: {}}, action) => {
  switch (action.type) {
    case TAG:
      const { text, id } = action;
      return {...state, tags: {...state.tags, [action.id]: { text,id } }}
    case HANDLE_INPUT:
      return {...state, input: action.input}
    default:
      return state;
  }
}
