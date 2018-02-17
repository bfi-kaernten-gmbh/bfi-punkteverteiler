import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import UserReducer from './user-reducer';
import authReducer from './auth-reducer';
import multiselectReducer from './multiselect-reducer';
import filterReducer from './filter-reducer';
import adminReducer from './admin-reducer';
import multiInput from '../components/reusable/multi-input/reducer';


const rootReducer = combineReducers({
  user: UserReducer,
  form: formReducer,
  auth: authReducer,
  select: multiselectReducer,
  filter: filterReducer,
  admin: adminReducer,
  multiInput
});

export default rootReducer;
