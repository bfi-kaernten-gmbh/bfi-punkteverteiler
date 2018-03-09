import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { renderField, createRules } from '../helpers';
import { changePassword } from '../../actions';

const validate = {
  email: createRules({ email: true, required: true }),
  required: createRules({ required: true }),
  password: createRules({ passwordConfirm: 'newPasswordConfirm', required: true })
}

class ChangePassword extends Component {
  handleSubmit = ({password, newPassword}) => {
    this.props.changePassword({password, newPassword}, () => {
      console.log('hi');
      this.props.reset();
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="outer-container fullScreenSection row justify-center flex-align-center">
        <form
          className="card-dark padding container-small"
          onSubmit={handleSubmit(this.handleSubmit.bind(this))}
        >
          <Field
            name="password"
            type="password"
            label="Old Password:"
            component={renderField}
            validate={validate.required}
          />
          <Field
            name="newPassword"
            type="password"
            label="New Password:"
            component={renderField}
            validate={validate.password}
          />
          <Field
            name="newPasswordConfirm"
            type="password"
            label="Confirm new Password:"
            component={renderField}
            validate={validate.password}
          />
          <button className="btn center">Passwort Ändern</button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'change-password'
})(
  connect(null, { changePassword })(ChangePassword)
);
