import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest, authenticated }) => (
  <Route {...rest} render={props => {
    return (
    authenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}}/>
)

const mapStateToProps = (state) => {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(PrivateRoute);
