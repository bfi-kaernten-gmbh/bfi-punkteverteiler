import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  fetchUser } from '../../actions';

class UserView extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchUser(id);
  }

  render() {
    const { user } = this.props;
    console.log(this.props.user);

    if(!user) {
      return <div>Loading...</div>
    }

    return (
      <div className="fullScreenSection">
        <div className="positioningContainer">
          <h1>{user.name}</h1>
          <div className="wrap">
            <h2>{user.points}</h2>
            <h3>Punkte</h3>
            <p className="center" >asdfj asdjfk j asjdfn asjd asjdfnja ajdsfnj asdf j</p>
          </div>

        </div>

      </div>
    );
  }
}

function mapStateToProps({ user }, ownProps) {
  console.log(ownProps);
  return { user: user[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchUser })(UserView);
