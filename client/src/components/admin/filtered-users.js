import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { ListItem } from '../reusable/adminListComponent';
import { multiselect, toggleChecked } from '../../actions';
import userFiltered from '../../selectors/filtered-user';

class UserFilteredList extends Component {
  render() {
    return this.props.filtered.map(user => {
      return (
        <ListItem
          toggleSelected={this.props.multiselect}
          toggleChecked={this.props.toggleChecked}
          key={user._id} id={user._id}
          name={user.username}
          checked={user.checked ? user.checked : false} />
      );
    })
  }
}

const mapStateToProps = state => {
  return { filtered: userFiltered(state)};
}

export default connect(
  mapStateToProps,
  { multiselect, toggleChecked }
)(UserFilteredList);
