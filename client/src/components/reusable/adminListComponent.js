import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class ListItem extends Component {

  handleOnClick = (e) => {
    this.props.toggleSelected(this.props.id);
    this.props.toggleChecked(this.props.id);
  }
  render() {
    return (
      <div className="admin-list-item card padding margin row flex-align-center">
        <input
          type="checkbox"
          onChange={this.handleOnClick}
          checked={this.props.checked}
        />
        <h4>{this.props.name}</h4>
          <Link className="position-right" to={`/admin/${this.props.id}`}>
            <button className="btn">bearbeiten</button>
          </Link>

      </div>
    );
  }
}

export default ListItem;
