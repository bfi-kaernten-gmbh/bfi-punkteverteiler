import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  fetchProfile } from '../../actions';
import _ from 'lodash';

class UserView extends Component {
  state = {
    log: true,
    class: 'flex fixed closed'
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
        class: 'flex fixed open'
      })
    } else {
      this.setState({
        class: 'flex fixed closed'
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
          <p>{date.toLocaleDateString('de-DE', dateOptions).replace(/,/g, ' -')}</p>
          <p>{pointLog.points} Punkte</p>
          <p>{pointLog.description}</p>
        </div>
      );
    })
  }

  renderLog = () => {
    const { log } = this.state;
    if(log) {
      var text = 'open log';
    } else {
      var text = 'close';
    }
    return (
      <div className={this.state.class}>
        <button className="fixed rounded" onClick={this.handleOnClick}>
          {text}
        </button>
        <div className='logContainer'>
          {this.handleLogList()}
        </div>
      </div>
    );
  }

  render() {
    const { user } = this.props;
    if(!user) {
      return <div>loading</div>
    }

    return (
      <div className="fullScreenSection">
        <div className="positioningContainer">
          <h1>{user.firstName}</h1>
          <h1>{user.lastName}</h1>
          <div className="wrap">
            <h2>{user.totalPoints}</h2>
            <h3>Punkte</h3>
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
