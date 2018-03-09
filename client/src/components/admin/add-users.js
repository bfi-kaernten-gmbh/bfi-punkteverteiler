import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { addUsers, pendingUsers } from '../../actions';
import MultiInput from '../reusable/multi-input'

class AddUsers extends Component {
  componentDidMount() {
    this.props.pendingUsers();
  }
  renderAddedEmails() {
    if(!this.props.addedUsers) {
      return <div></div>;
    }
    return _.map(this.props.addedUsers, (mail) => {
      return (
        <div className="shadow-small pl" key={mail._id}>
          <p className="space-top">{mail.email}</p>
        </div>
      )
    })
  }

  render() {
    return(
      <div className="outer-container-mp fullHeight-gradiant row justify-center flex-align-start">
        <MultiInput
          title="E-Mail der Empfänger"
          handleSubmit={this.props.addUsers}
        />
        <div className="col-6 mlr">
          <div className="card padding">
            <h3 className="fullWidth accent pl">Pending Users</h3>
            {this.renderAddedEmails()}
          </div>
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
  mapStateToProps, { addUsers, pendingUsers }
)(AddUsers);
