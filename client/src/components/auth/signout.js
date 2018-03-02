import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signoutUser } from '../../actions';

class Signout extends Component {
  handleOnClick = () => {
    this.props.signoutUser();
  }
  render() {
    return <a className="signout" onClick={this.handleOnClick}>Sign Out</a>;
  }
}

export default connect(null, { signoutUser })(Signout);
