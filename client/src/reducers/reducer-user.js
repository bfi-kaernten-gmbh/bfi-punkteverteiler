import { FETCH_USER, FETCH_USERLIST, UPDATE_USER }from '../actions';


export default function(state = null, action) {
  switch(action.type) {
  case FETCH_USER:
    return  action.payload.data;
  case FETCH_USERLIST:
    return action.payload;
  case UPDATE_USER:
  console.log(action.payload);
    return {
      ...state,
    };
  default:
    return state;
  }
}
