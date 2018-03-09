import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { tag, handleInput, resetTags } from './actions';
import Tag from './tag';

class MultiInput extends Component {
  handleSubmit = () => {
    const tags = _.map(this.props.tags, (tag) => {
      return tag.text;
    });
    this.props.handleSubmit(tags);
    this.props.resetTags();
  }

  handleChange = (e) => {
    this.props.handleInput(e.target.value);
  }

  handleKeyDown = (e) => {
    const { which: key } = e;
    if(key === 13 || key === 9) {
      e.preventDefault();
      this.saveTag();
    }
  }

  saveTag = () => {
    const { input } = this.props;
    if (input !== '') {
      this.props.tag(this.props.input);
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
    console.log(this.props);
    const { input: input = '' } = this.props;
    return (
      <div className="container-middle-small">
        <div className="card-dark padding shadow-bottom">
          <h3 className="white padding-bottom">{this.props.title}</h3>
          <div className="fullWidth">
            <input className="fullWidth" value={input}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              onBlur={this.saveTag}
            />
          </div>
          <button className="btn" onClick={this.handleSubmit}>Send</button>
        </div>
        <div className="container margin-top">
          {this.renderTags()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({multiInput}) => ({
  tags: multiInput.tags,
  input: multiInput.input || ''
})

export default connect(
  mapStateToProps, { tag, handleInput, resetTags }
)(MultiInput);
