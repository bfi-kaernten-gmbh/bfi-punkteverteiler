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
      <div className="outer-container row flex-align-start justify-start fullHeight-gradiant">
        <div className="col-6 column justify-start flex-align-start">
          <div className="card-dark padding row fullWidth">
            <label className="container nop white">Filter nach Username </label>
            <input className="container" onChange={this.handleFilterInput} />
          </div>
        </div>
        <div className="col-6 column"></div>

          <div className="col-6 column justify-start flex-align-start">
            <h3 className="white">Gefilterte User Liste</h3>
            <UserFilteredList />
          </div>

          <div className="col-6 column ">
            <h3 className="white">User Liste</h3>
            { this.renderUserList() }
          </div>

          <form className=" add-multiple-points card-dark bottom-left" onSubmit={this.handleSubmit} >
            <label>Punkte</label>
            <input
              onChange={
                this.handleChange = (e) => {this.setState({addPoints: e.target.value})}
              }
              type="number"
              name="addPoints"
              label="Punkte"
              value={this.state.addPoints}
            />
            <label>Beschreibung</label>
            <textarea
              onChange={
                this.handleChange = (e) => {this.setState({description: e.target.value})}
              }
              type="text"
              name="description"
              label="Beschreibung"
              value={this.state.description}
            />
            <div className="container">
              <button className="btn" >Speichern</button>
            </div>
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
