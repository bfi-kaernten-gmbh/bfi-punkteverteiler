import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { tag, handleInput } from './actions';
import Tag from './tag';

class multiSelectInput extends Component {
  handleChange = (e) => {
    this.props.handleInput(e.target.value)
  }

  handleKeyDown = (e) => {
    const { which: key } = e;
    if(key === 13 || key === 9) {
      e.preventDefault();
      this.props.tag(e.target.value);
      this.props.handleInput('');
    }
  }

  renderTags = () => {
    const {tags} = this.props;
    return _.map(tags, (tag) => {
      return (
        <Tag
          text={tag.text}
          key={tag.id}
          id={tag.id}
          updateTag={this.props.tag}
        />
      );
    })
  }

  render() {
    const { input: input = '' } = this.props;
    return (
      <div>
        <div>
          {this.renderTags()}
        </div>
        <div>
          <input value={input}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
        </div>
        <button>Send</button>
      </div>
    )
  }
}

const mapStateToProps = ({multiInput}) => ({
  tags: multiInput.tags,
  input: multiInput.input || ''
})

export default connect(
  mapStateToProps, { tag, handleInput }
)(multiSelectInput)
