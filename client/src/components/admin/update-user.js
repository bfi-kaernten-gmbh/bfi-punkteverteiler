import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser, updateUser } from '../../actions';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import { renderField } from '../helpers/render-field';


class AdminSingleUserUpdate extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchUser(id);
  }

  onSubmit(values) {
    const { _id } = this.props.user;
    this.props.updateUser({ids: [_id], addPoints: values.punkte}, () => {
      console.log(_id);
      this.props.history.push('/admin');
    });
  }

  render() {
    const { user } = this.props;
    const { handleSubmit } = this.props;
    console.log(user);

    return(
      <div>
        <p>{user.username}</p>
        <p>{user.totalPoints}</p>
        <div>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              label="Punkte"
              name="punkte"
              component={renderField}
            />
            <Field
              label="Beschreibung"
              name="text"
              component={renderField}
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
  return { user }
}

export default reduxForm({
  validate,
  form: 'UpdateUser'
})(
  connect(mapStateToProps, {fetchUser, updateUser})(AdminSingleUserUpdate)
);
