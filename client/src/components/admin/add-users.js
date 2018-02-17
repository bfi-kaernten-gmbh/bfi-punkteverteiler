import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { addUsers } from '../../actions';
import MultiInput from '../reusable/multi-input'

class AddUsers extends Component {
  renderAddedEmails() {
    if(!this.props.addedUsers) {
      return <div></div>;
    }
    return _.map(this.props.addedUsers, (mail) => {
      return (
        <div key={mail._id}>
          <p>{mail.email}</p>
        </div>
      )
    })
  }

  render() {
    return(
      <div>
        <MultiInput
          handleSubmit={this.props.addUsers}
        />
        <div>
          {this.renderAddedEmails()}
        </div>
      </div>
    )
  }
}


const mapStateToProps = ({ admin }) => {
  return {
    addedUsers: admin.addedUsers
  }
}

export default connect(
  mapStateToProps, { addUsers }
)(AddUsers);
