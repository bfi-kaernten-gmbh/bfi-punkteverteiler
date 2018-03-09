import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser, updateUser } from '../../actions';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { UserLog } from '../reusable/pointLog';

import { renderField } from '../helpers/render-field';


class AdminSingleUserUpdate extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchUser(id);
  }

  onSubmit({addPoints, description}) {
    const { _id } = this.props.user;
    this.props.updateUser({ids: [_id], addPoints, description}, () => {
      this.props.history.push('/admin');
    });
  }

  render() {
    const { user } = this.props;
    const { handleSubmit } = this.props;
    if(!user) {
      return <div>loading</div>
    }
    return(
      <div className="outer-container fullHeight-gradiant">
        <div className="row justify-center container">
          <div className="card-dark shadow-bottom padding">
            <h3 className="accent padding-left">{user.username}</h3>
            <h4 className="white padding-left">{user.email}</h4>
            <h3 className="white padding">{user.totalPoints}</h3>
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
                <button className="btn" type="submit">Senden</button>
                <Link to="/admin">
                  <button className="btn">
                    Abbrechen
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </div>
        <UserLog user={this.props.user}/>
      </div>
    );
  }
}

function mapStateToProps({ user }, ownProps) {
  return { user: user[ownProps.match.params.id]}
}

export default reduxForm({
  form: 'UpdateUser'
})(
  connect(mapStateToProps, {fetchUser, updateUser})(AdminSingleUserUpdate)
);
