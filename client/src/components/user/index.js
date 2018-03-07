import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  fetchProfile } from '../../actions';
import _ from 'lodash';

class UserView extends Component {
  state = {
    log: true,
    class: 'card-log'
  }

  componentDidMount() {
    this.props.fetchProfile();
  }

  handleOnClick = () => {
    this.setState({
      log: !this.state.log,
    })
    if(this.state.log) {
      this.setState({
        class: 'card-log open'
      })
    } else {
      this.setState({
        class: 'card-log closed'
      })
    }
  }

  handleLogList = () => {
    return _.map(this.props.user.pointLog, pointLog => {
      const date = new Date(pointLog.createdAt);
      const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
      };
      return (
        <div className="container" key={pointLog._id}>
          <p>{date.toLocaleDateString('de-DE', dateOptions).replace(/,/g, ' -')} {pointLog.points} | Punkte</p>
          <p>{pointLog.description}</p>
        </div>
      );
    })
  }

  renderLog = () => {
    const { log } = this.state;
    var text;
    if(log) {
      text = '+';
    } else {
      text = '-';
    }
    return (
      <div className={this.state.class}>
        <div className='container'>
          {this.handleLogList()}
        </div>
        <button className="btn fixed-right position rounded shadow-big" onClick={this.handleOnClick}>
          {text}
        </button>
      </div>
    );
  }

  render() {
    const { user } = this.props;
    if(!user) {
      return <div>loading</div>
    }

    return (
      <div className="fullScreenSection outer-container">
        <div className="container">
          <h1 className="padding">{`${user.firstName} ${user.lastName}`}</h1>
          <div className="card shadow-bottom margin padding row flex-align-center">
            <h2 className="padding">{user.totalPoints}</h2>
            <h3 className="padding">Punkte</h3>
          </div>
        </div>
        {this.renderLog()}
      </div>
    );
  }
}

function mapStateToProps({ user }, ownProps) {
  return { user: user[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchProfile })(UserView);
