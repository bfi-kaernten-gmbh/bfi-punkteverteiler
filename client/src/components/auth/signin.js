import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import { signinUser } from '../../actions';

class Signin extends Component {
  handleSubmit = ({email, password}) => {
    this.props.signinUser({ email, password }, (route) => {
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
        <fieldset>
          <label>Email:</label>
          <Field
            name="email"
            type="text"
            component="input"
          />
        </fieldset>
        <fieldset>
          <label>Password:</label>
          <Field
            name="password"
            type="password"
            component="input"
          />
        </fieldset>
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
