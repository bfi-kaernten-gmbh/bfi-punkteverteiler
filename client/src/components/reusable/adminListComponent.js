import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class ListItem extends Component {
  handleOnClick = (e) => {
    this.props.toggleSelected(this.props.id);
    this.props.toggleChecked(this.props.id);
  }
  render() {
    return (
      <div>
        <p>{this.props.name}</p>
        <Link to={`/admin/${this.props.id}`}>
          <button>bearbeiten</button>
        </Link>
        <input type="checkbox"
          onClick={this.handleOnClick}
          checked={this.props.checked}
        />
      </div>
    );
  }
}

export default ListItem;
