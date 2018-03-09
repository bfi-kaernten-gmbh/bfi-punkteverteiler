import React, { Component } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux'
import { signinUser } from '../../actions';
import { renderField } from '../helpers';

class Signin extends Component {
  componentDidMount() {
    if(this.props.authenticated) {
      this.props.history.push(this.props.role);
    }
  }

  handleForgotPassword = () => {
    console.log(this.props.values);
  }

  handleSubmit = ({username, password}) => {
    this.props.signinUser({ username, password }, (route) => {
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
      <div className="fullScreenSection signin container-fullWidth row flex-align-stretch justify-start">
        <form
          className="col-3 bg-dark-grey column flex-align-center justify-center"
          onSubmit={handleSubmit(this.handleSubmit.bind(this))}
        >
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
          <button className="btn" action="submit">Sign in </button>
          <p
            onClick={this.handleForgotPassword}
            className="fullwidth accent uppercase pointer">
            forgot password?
          </p>
        </form>
        <div className="shadow-left col"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.error,
    authenticated: state.auth.authenticated,
    role: state.auth.role,
    values: getFormValues('signin')(state)
  };
}

export default reduxForm({
  form: 'signin'
})(
  connect(mapStateToProps, { signinUser })(Signin)
);
