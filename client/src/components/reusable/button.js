import React from 'react';

export default () => {
  return (
    <button className="fixed rounded" onClick={this.handleOnClick}>
      {this.props.text}
    </button>
  );
}
