import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserList, multiselect, updateUser, filter, toggleChecked } from '../../actions';
import { ListItem } from '../reusable/adminListComponent';
import UserFilteredList from './filtered-users';

class AdminView extends Component {
  state = {
    addPoints: '',
    description: '',
  }

  componentDidMount() {
    this.props.fetchUserList();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { addPoints, description } = this.state;
    const { selected } = this.props.selected;
    this.props.updateUser({ids: selected, addPoints, description}, () => {console.log(this.state);})
  }

  handleFilterInput = (e) => {
    this.props.filter(e.target.value);
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
  { fetchUserList, multiselect, updateUser, filter, toggleChecked }
)(AdminView);
