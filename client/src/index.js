import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import './index.min.css';
import registerServiceWorker from './registerServiceWorker';

import App from './components/App';
import UserView from './components/user';
import AdminView from './components/admin';
import AdminSingleUserUpdate from './components/admin/update-user';
import PrivateRoute from './components/auth/private-route';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import reducers from './reducers';

import { AUTH_USER } from './actions/types';

const store = createStore(
  reducers,
  compose(
    applyMiddleware(reduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
)
const token = localStorage.getItem('token');

// dispatch an action autonatically if a JWT is stored in localStorage
if (token) {
  store.dispatch({ type: AUTH_USER })
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
          <PrivateRoute path="/user" component={UserView} />
          <Route path="/signin" component={Signin} />
          <Route path="/signout" component={Signout} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
