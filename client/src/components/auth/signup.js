import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field,  reduxForm, getFormValues } from 'redux-form';
import { Redirect } from 'react-router-dom';

import { validateSignup } from '../../actions/auth-actions';
import { renderField } from '../helpers/render-field';

class Signup extends Component {
  componentWillMount() {
    var {pathname: id} = this.props.history.location;
    id = id.replace('/signup/', '');
    this.props.validateSignup(id);
  }

  handleSubmit = (values) => {
    const username = this.parseUsername();
    // action({...values, username})
  }

  parseUsername = () => {
    let { firstName, lastName } = this.props.values || '';
    firstName = firstName || ''
    lastName = lastName || ''
    return `${firstName}.${lastName}`.replace(/[\u00c4\u00e4äÄ]/g, "ae")
      .replace(/[\u00dc\u00fcüÜ]/g, "ue")
      .replace(/[\u00d6\u00f6öÖ]/g, "oe")
      .replace(/\u00dfß/g, "ss")
      .toLowerCase()
    ;
  }

  render() {
    console.log(this.props);
    const { handleSubmit } = this.props;
    const { signupValid } = this.props.auth;
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
          />
          <Field
            name="firstName"
            label="Vorname"
            component={renderField}
          />
          <Field
            name="lastName"
            label="Nachname"
            value="test"
            component={renderField}
          />
          <div>{this.parseUsername()}</div>
          <Field
            name="password"
            label="Password"
            type="password"
            component={renderField}
          />
          <Field
            name="passwordConfirm"
            label="Password bestätigen"
            type="password"
            component={renderField}
          />
        </form>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    values: getFormValues('signup')(state)
  };
};

export default reduxForm({
  form: 'signup'
})(
  connect(mapStateToProps, { validateSignup })(Signup)
);
