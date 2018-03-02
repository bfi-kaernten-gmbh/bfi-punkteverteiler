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
        <div className={`messageContainer ${className}`}>
          <div className="message">
            {errorMessage ? errorMessage : successMessage}
          </div>
          <button onClick={this.handleClose}>Close</button>
        </div>
      );
    }
    else {
      return <div className="message"></div>;
    }
  }
};

const mapStateToProps = ({ admin: {errorMessage,successMessage} }) => {
  return { errorMessage, successMessage };
}

export default connect(
  mapStateToProps,
  { successMessageFunc: successMessage }
)(Message);
