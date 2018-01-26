import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import UserReducer from './user-reducer';
import authReducer from './auth-reducer';


const rootReducer = combineReducers({
  user: UserReducer,
  form: formReducer,
  auth: authReducer
});

export default rootReducer;
