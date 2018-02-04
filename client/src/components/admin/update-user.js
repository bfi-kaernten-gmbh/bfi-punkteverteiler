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

  onSubmit({addPoints, description}) {
    const { _id } = this.props.user;
    this.props.updateUser({ids: [_id], addPoints, description}, () => {
      console.log(_id);
      this.props.history.push('/admin');
    });
  }

  render() {
    const { user } = this.props;
    console.log(user);
    const { handleSubmit } = this.props;
    if(!user) {
      return <div>loading</div>
    }
    return(
      <div>
        <p>{user.username}</p>
        <p>{user.totalPoints}</p>
        <div>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              label="Punkte"
              name="addPoints"
              component={renderField}
            />
            <Field
              label="Beschreibung"
              name="description"
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
  return { user: user[ownProps.match.params.id]}
}

export default reduxForm({
  validate,
  form: 'UpdateUser'
})(
  connect(mapStateToProps, {fetchUser, updateUser})(AdminSingleUserUpdate)
);
