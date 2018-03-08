import React, { Component } from 'react';
import { connect } from 'react-redux';

import Message from './reusable/message';
import Signout from './auth/signout';
import { Link } from 'react-router-dom';

class App extends Component {
  renderLinks() {
    if (this.props.auth.authenticated) {
      return (
        <div className="col-4">
          <Signout />
          <Link to="/change-password"> Change Password</Link>
        </div>
      );
    }
  }
  renderAdminLinks() {
    if(this.props.auth.role === "admin") {
      return (
        <div className="col-6">
          <Link to="/admin"> Home</Link>
          <Link to="/add-users"> add Users</Link>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <div className="bar row flex-align-center justify-space-between">
          {this.renderAdminLinks()}
          {this.renderLinks()}
        </div>
        <Message />
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(App);
