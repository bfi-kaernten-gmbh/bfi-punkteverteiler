import { FETCH_USER, FETCH_USERLIST, UPDATE_USER }from '../actions';

const initialState = {
  1: {
    id: 1,
    username: 'mar.zer',
    firstName: 'Markus',
    lastName: 'Mälzer',
    email: 'react@redux.git',
    totalPoints: 24,
    pointLog: {
      1: {
        id: 1,
        points: '2',
        text: 'just for chillin'
      }
    }
  },
  2: {
    id: 2,
    username: 'Wenge',
    name: 'Dominik Wenghofer',
    email: 'react@gitignore.redux',
    points: 20,
    pointLog: {
      1: {
        id: 1,
        points: 10,
        text: 'just for chillin'
      },
      2: {
        id: 2,
        points: 2,
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
