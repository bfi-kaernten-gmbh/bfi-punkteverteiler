import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import UserReducer from './user-reducer';
import authReducer from './auth-reducer';
import multiInput from '../components/reusable/multiSelectInput/reducer';

const rootReducer = combineReducers({
  user: UserReducer,
  form: formReducer,
  auth: authReducer,
  multiInput
});

export default rootReducer;
