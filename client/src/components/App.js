import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Message from './reusable/message';

class App extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return <Link to="/signout">Sign Out</Link>;
    }
  }
  renderMessage() {
    const { errorMessage, successMessage } = this.props;
    if(errorMessage || successMessage) {
      return (
        <Message
          message={errorMessage || successMessage}
          error={errorMessage ? true : false}
        />
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderLinks()}
        {this.renderMessage()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { errorMessage, successMessage } = state.admin;
  return { authenticated: state.auth.authenticated, errorMessage, successMessage };
}

export default connect(mapStateToProps)(App);
