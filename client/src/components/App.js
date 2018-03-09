import React, { Component } from 'react';
import { connect } from 'react-redux';

import Message from './reusable/message';
import Signout from './auth/signout';
import { Link } from 'react-router-dom';

class App extends Component {
  renderLinks() {
    if (this.props.auth.authenticated) {
      return (
        <div className="col row flex-align-center justify-end">
          <Link to="/change-password"> Change Password</Link>
          <Signout />
        </div>
      );
    }
  }
  fixLink = () => {
    return
  }
  renderAdminLinks() {
    if(this.props.auth.role === "admin") {
      return (
        <div className="col">
          <Link to="/admin"> Home</Link>
          <Link to="/add-users"> add Users</Link>
        </div>
      )
    } else {
      return (
        <div className="col">
          <Link to={'/'+this.props.auth.role}>Home</Link>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <nav className={`row flex-align-center justify-space-between ${this.props.auth.authenticated ? '' : 'hidden'}`}>
          {this.renderAdminLinks()}
          {this.renderLinks()}
        </nav>
        <Message />
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(App);
