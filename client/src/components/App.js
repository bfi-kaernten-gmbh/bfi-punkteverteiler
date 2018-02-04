import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class App extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return <Link to="/signout">Sign Out</Link>;
    }
  }

  componentDidMount() {
    if (!this.props.authenticated && this.props.history.location.pathname !== '/signin') {
      this.props.history.push('/signin');
    }
  }
  render() {
    return (
      <div>
        {this.renderLinks()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(App);
