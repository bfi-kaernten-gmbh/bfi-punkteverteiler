import React, { Component } from 'react';

export default class Tag extends Component {
  state = {
    edit: false,
    input: this.props.text
  }

  handleKeyDown = (e) => {
    const { which: key } = e;
    console.log(key);
    if(key === 13) {
      e.preventDefault();
      this.toggleEdit();
    }
  }

  toggleEdit = () => {
    this.setState({edit: !this.state.edit});
    setTimeout(() => {
      if(this.state.edit) {
        this.inputName.focus();
      }
    }, 100);
  }

  handleOnChange = (e) => {
    this.props.updateTag(e.target.value, this.props.id);
  }

  renderHelper() {
    const { text } = this.props;
    if(this.state.edit) {
      return (
        <input
          className="fullWidth"
          ref={(input) => { this.inputName = input; }}
          value={text}
          onChange={this.handleOnChange}
          onBlur={this.toggleEdit}
          onKeyDown={this.handleKeyDown}
         />
      );
    } else {
      return <span className="white" onClick={this.toggleEdit}>{text}</span>;
    }
  }

  render() {
    return (
      <div>
        {this.renderHelper()}
      </div>
    )
  }
}
