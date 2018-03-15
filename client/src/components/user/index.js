import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProfile } from '../../actions';

import { UserLog } from '../reusable/pointLog';
import { Cloud } from '../reusable/cloud';

class UserView extends Component {
  state = {
    log: true,
    class: 'card-log'
  }

  componentDidMount() {
    this.props.fetchProfile();
  }


  render() {
    const { user } = this.props;
    if(!user) {
      return <div>loading</div>
    }

    return (
      <div className="fullScreenSection outer-container">
        <div className="container">
          <h1 className="padding align-center">{`${user.firstName} ${user.lastName}`}</h1>
          <div className="margin padding row flex-align-center justify-center">
            <Cloud
              shadow
              points={user.totalPoints || '0'}
            />
          </div>
        </div>
        <UserLog user={this.props.user} />
      </div>
    );
  }
}

function mapStateToProps({ user }, ownProps) {
  return { user: user[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchProfile })(UserView);
