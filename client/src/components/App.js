import React, { Component } from 'react';
import { connect } from 'react-redux';

import Message from './reusable/message';
import Signout from './auth/signout';

class App extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div className="bar">
          <Signout />
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderLinks()}
        <Message />
      </div>
    );
  }
}

const mapStateToProps = ({auth: {authenticated}}) => ({ authenticated });

export default connect(mapStateToProps)(App);
