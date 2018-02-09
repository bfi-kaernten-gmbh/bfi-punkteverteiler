import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class ListItem extends Component {
  handleOnClick = () => {
    this.props.toggleSelected(this.props.id);
  }

  render() {
    return (
      <div>
        <p>{this.props.name}</p>

        <Link to={`/admin/${this.props.id}`}>
          <button>bearbeiten</button>
        </Link>

        <input type="checkbox" onClick={this.handleOnClick}/>

      </div>
    );
  }
}
