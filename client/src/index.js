import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './index.min.css';
import registerServiceWorker from './registerServiceWorker';

import App from './components/App';
import UserView from './components/user';
import AdminView from './components/admin';
import AdminSingleUserUpdate from './components/admin/update-user';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <Switch>
        <Route path="/admin/:id" component={AdminSingleUserUpdate} />
        <Route path="/user/:id" component={UserView} />
        <Route path="/admin" component={AdminView} />
        <Route path="/user" component={UserView} />
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
