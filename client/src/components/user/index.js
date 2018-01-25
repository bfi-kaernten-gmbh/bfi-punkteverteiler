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
      <div>
        <div>
          <h2>{user.name}</h2>
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
