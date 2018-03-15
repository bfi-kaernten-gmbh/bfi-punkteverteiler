import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { resetPassword } from '../../actions';
import { renderField, createRules } from '../helpers';

const validate = {
  password: createRules({ passwordConfirm: 'newPassword', required: true })
}

class ResetPassword extends Component {
  handleSubmit = ({newPassword}) => {
    const { token } = this.props.match.params;
    this.props.resetPassword({token, newPassword}, (location) => {
      this.props.history.push(location);
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="fullScreenSection outer-container row justify-center flex-align-center">
        <form
          className="card-dark padding container-small"
          onSubmit={handleSubmit(this.handleSubmit.bind(this))}
        >
          <Field
            name="password"
            type="password"
            label="New password"
            component={renderField}
            validate={validate.password}
          />
          <Field
            name="newPassword"
            type="password"
            label="Confirm new password"
            component={renderField}
            validate={validate.password}
          />
          <button className="btn" type="submit">Change password</button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'resetPassword'
})(
  connect(null, { resetPassword })(ResetPassword)
)
