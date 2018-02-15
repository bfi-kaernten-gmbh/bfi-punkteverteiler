import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import UserReducer from './user-reducer';
import authReducer from './auth-reducer';
import multiselectReducer from './multiselect-reducer';
import filterReducer from './filter-reducer';


const rootReducer = combineReducers({
  user: UserReducer,
  form: formReducer,
  auth: authReducer,
  select: multiselectReducer,
  filter: filterReducer
});

export default rootReducer;
