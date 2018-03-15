import React, { Component } from 'react';

export default class Tag extends Component {
  state = {
    edit: false,
    input: this.props.text
  }

  handleKeyDown = (e) => {
    const { which: key } = e;
    if(key === 13 || key === 9) {
      e.preventDefault();
      this.disableEdit();
    }
  }

  enableEdit = () => {
    this.setState({ edit: true });
    this.focusInput();
  }
  disableEdit = () => {
    this.setState({ edit: false });
  }

  focusInput = () => {
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
          onBlur={this.disableEdit}
          onKeyDown={this.handleKeyDown}
         />
      );
    } else {
      return <span className="white">{text}</span>;
    }
  }

  render() {
    return (
      <div className="tag" onClick={this.enableEdit}>
        {this.renderHelper()}
      </div>
    )
  }
}
