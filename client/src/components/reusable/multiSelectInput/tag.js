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
      this.props.updateTag(e.target.value, this.props.id);
    }
  }
  toggleEdit = () => {
    this.setState({edit: !this.state.edit});
    setTimeout(() => {
      console.log('foucs');
      if(this.state.edit)
        this.inputName.focus();
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
          ref={(input) => { this.inputName = input; }}
          value={text}
          onChange={this.handleOnChange}
          onBlur={this.toggleEdit}
         />
      );
    } else {
      return <span onClick={this.toggleEdit}>{text}</span>;
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
