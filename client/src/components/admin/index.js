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
    return _.map(this.props.user, user => {
      console.log(user.punkteLog);
      return (
        <div key={user.id}>
          <p>{user.name}</p>
          
          <Link to={`/admin/${user.id}`}>
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
  return { user: state.user };
}

export default connect(mapStateToProps, {fetchUserList})(AdminView);
