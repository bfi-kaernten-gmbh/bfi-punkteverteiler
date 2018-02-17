import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class App extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return <Link to="/signout">Sign Out</Link>;
    }
  }
  renderError() {
    if(this.props.errorMessage) {
      return <div>{this.props.errorMessage}</div>
    }
  }

  render() {
    return (
      <div>
        {this.renderLinks()}
        {this.renderError()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated, errorMessage: state.admin.errorMessage };
}

export default connect(mapStateToProps)(App);
