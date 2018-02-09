import {
  MULTISELECT
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case MULTISELECT:
    if(state.selected) {
      const newState = state.selected.filter((id) => {
        return id !== action.id;
      });
      if(newState.length === state.selected.length) {
        return { ...state, selected: [...state.selected, action.id]};
      } else {
        return { ...state, selected: [...newState] };
      }
    } else {
      return {...state, selected: [action.id]}
    }

    default:
      return state;
  }
}
