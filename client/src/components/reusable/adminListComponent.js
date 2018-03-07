import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class ListItem extends Component {
  handleOnClick = (e) => {
    this.props.toggleSelected(this.props.id);
    this.props.toggleChecked(this.props.id);
  }
  render() {
    return (
      <div className="admin-list-item">
        <p>{this.props.name}</p>
        <Link to={`/admin/${this.props.id}`}>
          <button className="btn">bearbeiten</button>
        </Link>
        <input type="checkbox"
          onChange={this.handleOnClick}
          checked={this.props.checked}
        />
      </div>
    );
  }
}

export default ListItem;
