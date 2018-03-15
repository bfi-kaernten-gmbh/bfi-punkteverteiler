import React, { Component } from 'react';
import { connect } from 'react-redux';
import { successMessage } from '../../actions';

class Message extends Component {
  handleClose = () => {
    this.props.successMessageFunc('');
  }

  render() {
    const { errorMessage, successMessage} = this.props;
    const className =
      errorMessage ? 'error' :
      successMessage ? 'success' : false
    ;
    if(className) {
      return (
        <div className={`messageContainer row flex-align-center justify-center`}>
          <div className={`message card padding ${className}`}>
            <p className="align-center">{errorMessage ? errorMessage : successMessage}</p>
            <button className="btn"  onClick={this.handleClose}>Close</button>
          </div>
        </div>
      );
    }
    else {
      return <div className="message"></div>;
    }
  }
};

const mapStateToProps = ({ admin: { errorMessage, successMessage } }) => {
  return { errorMessage, successMessage };
}

export default connect(
  mapStateToProps,
  { successMessageFunc: successMessage }
)(Message);
