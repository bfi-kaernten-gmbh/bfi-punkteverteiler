import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchUser, updateUser } from '../../actions';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';


class AdminSingleUserUpdate extends Component {
  componentDidMount() {
    const { _id } = this.props.match.params;
    this.props.fetchUser(_id);
  }

  renderField(field) {
    return (
      <div>
        <label>{field.label}:</label>
        <input
          type="text"
          {...field.input}
        />
      </div>
    );
  }

  onSubmit(values) {
    console.log(this.props.user.id);
    const { id } = this.props.user;
    this.props.updateUser(values, id, () => {
      this.props.history.push('/admin');
    });
  }

  render() {
    const { user } = this.props;
    const { handleSubmit } = this.props;
    console.log(user);

    return(
      <div>
        {user.username}
        <div>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              label="Punkte"
              name="punkte"
              component={this.renderField}
            />
            <Field
              label="Beschreibung"
              name="text"
              component={this.renderField}
            />
            <button type="submit">Senden</button>
            <Link to="/admin">
              <button>
                Abbrechen
              </button>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

}

function mapStateToProps({ user }, ownProps) {
  return { user: user[ownProps.match.params.id] }
}

export default reduxForm({
  validate,
  form: 'UpdateUser'
})(
  connect(mapStateToProps, {fetchUser, updateUser})(AdminSingleUserUpdate)
);
