import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Message from './reusable/message';

class App extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div className="bar">
          <Link to="/signout">Sign Out</Link>
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

const mapStateToProps = ({auth: authenticated}) => ({ authenticated });

export default connect(mapStateToProps)(App);
