import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { ListItem } from '../reusable/adminListComponent';
import { multiselect } from '../../actions';
import userFiltered from '../../selectors/filtered-user';

class UserFilteredList extends Component {

  checkSelected(id) {
    console.log(this.props.selected);
    return this.props.selected.find((el) => {
      return el === id
    });
  }

  render() {
    return this.props.filtered.map(user => {
      if(this.props.selected && this.checkSelected(user._id)) {
        return (
          <ListItem toggleSelected={this.props.multiselect} key={user._id} id={user._id} name={user.username} check={true}/>
        );
      } else {
        return (
          <ListItem toggleSelected={this.props.multiselect} key={user._id} id={user._id} name={user.username}/>
        );
      }
    })
  }

}

const mapStateToProps = state => {
  return { filtered: userFiltered(state), selected: state.select.selected};
}

export default connect( mapStateToProps, { multiselect })(UserFilteredList);
