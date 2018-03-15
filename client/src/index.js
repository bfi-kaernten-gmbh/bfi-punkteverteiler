import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';

import './scss/index.min.css';

import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';

import App from './components/App';
import UserView from './components/user';
import AdminView from './components/admin';
import AdminSingleUserUpdate from './components/admin/update-user';
import PrivateRoute from './components/auth/private-route';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import AddUsers from './components/admin/add-users';
import ChangePassword from './components/auth/change-password';
import ResetPassword from './components/auth/reset-password';


import { AUTH_USER } from './actions/types';

const store = createStore(
  reducers,
  compose(
    applyMiddleware(reduxThunk, promiseMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
);
const token = localStorage.getItem('token');
let role = localStorage.getItem('role');

// dispatch an action automatically if a JWT is stored in localStorage
if (token) {
  store.dispatch({ type: AUTH_USER, role })
  // add sth for status redirect
}


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" component={App} />
        <Switch>
          <PrivateRoute path="/admin/:id" component={AdminSingleUserUpdate} />
          <PrivateRoute path="/user/:id" component={UserView} />
          <PrivateRoute path="/admin" component={AdminView} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup/:id" component={Signup} />
          <PrivateRoute path="/add-users" component={AddUsers} />
          <PrivateRoute path="/change-password" component={ChangePassword} />
          <Route path="/reset/:token" component={ResetPassword} />
          <Route component={Signin} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
