import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import { signinUser } from '../../actions';
import { renderField } from '../helpers';

class Signin extends Component {
  handleSubmit = ({username, password}) => {
    this.props.signinUser({ username, password }, (route) => {
      console.log(route);
      this.props.history.push(route);
    });
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
          <Field
            name="username"
            label="Username:"
            component={renderField}
          />
          <Field
            name="password"
            type="password"
            label="Password:"
            component={renderField}
          />
        {this.renderAlert()}
        <button action="submit">Sign in </button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signin'
})(
  connect(mapStateToProps, { signinUser })(Signin)
);
