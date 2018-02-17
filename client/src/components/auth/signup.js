import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field,  reduxForm, getFormValues,getFormInitialValues } from 'redux-form';
import { Redirect } from 'react-router-dom';
import mapKeys from 'lodash/mapKeys';

import { validateSignup, signupUser } from '../../actions';
import { renderField, createRules } from '../helpers';

const validate = {
  email: createRules({ email: true, required: true }),
  required: createRules({ required: true }),
  password: createRules({ passwordConfirm: 'passwordConfirm', required: true })
}

class Signup extends Component {
  componentWillMount() {
    var {pathname: id} = this.props.history.location;
    id = id.replace('/signup/', '');
    this.props.validateSignup(id);
  }

  handleSubmit = (values) => {
    const username = this.parseUsername();
    var {pathname: id} = this.props.history.location;
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
    return `${firstName}.${lastName}`.replace(/[\u00c4\u00e4äÄ]/g, "ae")
      .replace(/[\u00dc\u00fcüÜ]/g, "ue")
      .replace(/[\u00d6\u00f6öÖ]/g, "oe")
      .replace(/\u00dfß/g, "ss")
      .toLowerCase()
    ;
  }

  render() {
    // console.log(this.props);
    const { handleSubmit } = this.props;
    const { signupValid } = this.props.auth;
    console.log(signupValid);
    if(!signupValid) {
      return <div>loading</div>;
    } else if (signupValid === 'error') {
      return <Redirect to="/donk" />;
    } else {
      return (
        <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
          <Field
            name="email"
            type="email"
            label="Email"
            component={renderField}
            validate={validate.email}
          />
          <Field
            name="firstName"
            label="Vorname"
            component={renderField}
            validate={validate.required}
          />
          <Field
            name="lastName"
            label="Nachname"
            value="test"
            component={renderField}
            validate={validate.required}
          />
          <div>
            <label>Username: </label>
            {this.parseUsername()}
          </div>
          <Field
            name="password"
            label="Passwort"
            type="password"
            component={renderField}
            validate={validate.password}
          />
          <Field
            name="passwordConfirm"
            label="Passwort bestätigen"
            type="password"
            component={renderField}
            validate={validate.required}
          />
          <button>Signup</button>
        </form>
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
