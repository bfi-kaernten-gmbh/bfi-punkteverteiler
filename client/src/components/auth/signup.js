import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field,  reduxForm, getFormValues } from 'redux-form';
import { Redirect } from 'react-router-dom';

import { validateSignup, signupUser } from '../../actions';
import { renderField, createRules } from '../helpers';

const validate = {
  email: createRules({ email: true, required: true }),
  required: createRules({ required: true }),
  password: createRules({ passwordConfirm: 'passwordConfirm', required: true })
}

class Signup extends Component {
  componentWillMount() {
    let { pathname: id } = this.props.history.location;
    id = id.replace('/signup/', '');
    this.props.validateSignup(id);
  }

  handleSubmit = (values) => {
    const username = this.parseUsername();
    let {pathname: id} = this.props.history.location;
    id = id.replace('/signup/', '');

    this.props.signupUser({
      ...values,
      username
    },id, (location) => {
      this.props.history.push(location);
    })
  }

  parseUsername = () => {
    let { firstName, lastName } = this.props.values || '';
    firstName = firstName || '';
    lastName = lastName || '';
    if(lastName || firstName) {
      return `${firstName}.${lastName}`.replace(/[\u00c4\u00e4äÄ]/g, "ae")
        .replace(/[\u00dc\u00fcüÜ]/g, "ue")
        .replace(/[\u00d6\u00f6öÖ]/g, "oe")
        .replace(/\u00dfß/g, "ss")
        .toLowerCase()
      ;
    }
  }

  render() {
    const { handleSubmit } = this.props;
    const { signupValid } = this.props.auth;

    if(!signupValid) {
      return <div>loading</div>;
    } else if (signupValid === 'error') {
      return <Redirect to="/donk" />;
    } else {
      return (
        <div className="fullScreenSection signin container-fullWidth row flex-align-stretch justify-start">
          <form className="col-3 bg-dark-grey column flex-align-center justify-center" onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
            <Field
              name="email"
              type="email"
              label="Email"
              component={renderField}
              validate={validate.email}
            />
            <Field
              name="firstName"
              label="First name"
              component={renderField}
              validate={validate.required}
            />
            <Field
              name="lastName"
              label="Last name"
              value="test"
              component={renderField}
              validate={validate.required}
            />
            <fieldset>
              <label>Username: </label>
              <p>{this.parseUsername()}</p>
            </fieldset>
            <Field
              name="password"
              label="Password"
              type="password"
              component={renderField}
              validate={validate.password}
            />
            <Field
              name="passwordConfirm"
              label="Confirm password"
              type="password"
              component={renderField}
              validate={validate.required}
            />
            <button className="btn">Signup</button>
          </form>
          <div className="shadow-left col"></div>
        </div>

      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    values: getFormValues('signup')(state),
    initialValues: {
      email: state.auth.email || 'email'
    }
  };
};

export default reduxForm({
  form: 'signup'
})(
  connect(mapStateToProps, { validateSignup, signupUser })(Signup)
);
