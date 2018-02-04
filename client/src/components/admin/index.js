import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserList } from '../../actions';

class AdminView extends Component {
  componentDidMount() {
    this.props.fetchUserList();
  }

  renderUserList() {
    return _.map(this.props.userList, user => {
      return (
        <div key={user._id}>
          <p>{user.username}</p>

          <Link to={`/admin/${user._id}`}>
            <button>bearbeiten</button>
          </Link>
          
        </div>
      );
    })
  }

  render() {
    return(
      <div>
        { this.renderUserList() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { userList: state.user.userList };
}

export default connect(mapStateToProps, {fetchUserList})(AdminView);
