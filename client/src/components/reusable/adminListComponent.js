import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class ListItem extends Component {
  handleOnClick = (e) => {
    this.props.toggleSelected(this.props.id);
    this.props.toggleChecked(this.props.id);
  }

  renderInput() {
    if(this.props.checked) {
      return (
        <input type="checkbox" onClick={this.handleOnClick} defaultChecked={this.props.check}/>
      );
    } else {
      return (
        <input type="checkbox" onClick={this.handleOnClick} defaultChecked={this.props.check}/>
      );
    }
  }

  render() {
    return (
      <div>
        <p>{this.props.name}</p>

        <Link to={`/admin/${this.props.id}`}>
          <button>bearbeiten</button>
        </Link>



      </div>
    );
  }
}

function mapStateToProps(state) {
  return { selected: state.select };
}

export default connect(mapStateToProps)(ListItem);
