import {
  FETCH_USER,
  FETCH_USERLIST,
  UPDATE_USER
} from '../actions/types';

const initialState = {
  1: {
    id: 1,
    username: 'maceeee',
    name: 'Markus Mälzer',
    email: 'react@redux.git',
    points: '24',
    punkteLog: {
      1: {
        id: 1,
        punkte: '2',
        text: 'just for chillin'
      }
    }
  },
  2: {
    id: 2,
    username: 'Wenge',
    name: 'Dominik Wenghofer',
    email: 'react@gitignore.redux',
    points: '0',
    punkteLog: {
      1: {
        id: 1,
        punkte: '0',
        text: 'just for chillin'
      },
      2: {
        id: 2,
        punkte: '2',
        text: 'idk'
      }
    }
  }
}

export default function(state = initialState, action) {
  switch(action.type) {
  case FETCH_USER:
    return { ...state };
  case FETCH_USERLIST:
    return state;
  case UPDATE_USER:
  console.log(action.payload);
    return {
      ...state,
    };
  default:
    return state;
  }
}
