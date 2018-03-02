import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import {
  fetchUserList, multiselect,
  updateUser, filter, toggleChecked,
  errorMessage
} from '../../actions';
import { ListItem } from '../reusable/adminListComponent';
import UserFilteredList from './filtered-users';

class AdminView extends Component {
  state = {
    addPoints: '',
    description: '',
  }

  componentDidMount() {
    this.props.filter('');
    this.props.fetchUserList();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { addPoints, description } = this.state;
    const { selected } = this.props.selected;
    if(selected) {
      this.props.updateUser({ids: selected, addPoints, description})
      this.setState({addPoints: '', description: ''});
    } else {
      this.props.errorMessage('Select Users');
    }
  }

  handleFilterInput = (e) => {
    clearTimeout(this.timeout);
    const value = e.target.value;
    this.timeout = setTimeout(() => {
      this.props.filter(value);
    }, 300);
  }

  renderUserList() {
    return _.map(this.props.userList, user => {
      return (
        <ListItem
          toggleChecked={this.props.toggleChecked}
          toggleSelected={this.props.multiselect}
          key={user._id} id={user._id}
          name={user.username}
          checked={user.checked ? user.checked : false}
        />
      );
    })
  }

  render() {
    return(
      <div>
        <div>
          <input onChange={this.handleFilterInput} />
        </div>
        <div>
          <UserFilteredList />
        </div>
        { this.renderUserList() }
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={
              this.handleChange = (e) => {this.setState({addPoints: e.target.value})}
            }
            type="number"
            name="addPoints"
            label="Punkte"
            value={this.state.addPoints}
          />
          <input
            onChange={
              this.handleChange = (e) => {this.setState({description: e.target.value})}
            }
            type="text"
            name="description"
            label="Beschreibung"
            value={this.state.description}
          />
          <button >Speichern</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { userList: state.user, selected: state.select };
}

export default connect(
  mapStateToProps,
  { fetchUserList, multiselect, updateUser, filter, toggleChecked, errorMessage }
)(AdminView);
