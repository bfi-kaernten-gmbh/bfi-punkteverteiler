import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { renderField, createRules } from '../helpers';

class ChangePassword extends Component {
  componentDidMount() {
    const location = this.props.history.location;
    console.log(location);
  }
  handleSubmit = (values) => {

  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div class="outer-container">
        <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>

        </form>
      </div>
    )
  }
}
