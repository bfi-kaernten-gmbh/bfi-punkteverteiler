import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  fetchProfile } from '../../actions';
import _ from 'lodash';

class UserView extends Component {
  state = {
    toggleLog: false,
    class: ''
  }

  componentDidMount() {
    this.props.fetchProfile();
  }

  handleOnClick = () => {
    this.setState({
      toggleLog: !this.state.toggleLog,
      class: 'animate',
    })
  }

  handleLogList = () => {
    return _.map(this.props.user.pointLog, pointLog => {
      return (
        <div className="container" key={pointLog._id}>
          <p>{pointLog.points} Punkte</p>
          <p>{pointLog.description}</p>
        </div>
      );
    })
  }

  renderLog = () => {
    if (!this.state.toggleLog === true) {
      return (
        <div className="flex">
          <button className="fixed rounded" onClick={this.handleOnClick}>
            open
          </button>
        </div>
      );
    }
    if (!this.state.toggleLog === false) {
      return (
        <div className="flex animate">
          <button className="fixed rounded" onClick={this.handleOnClick}>
            close
          </button>
          <div className='logContainer'>
            {this.handleLogList()}
          </div>
        </div>
      );
    }
  }


  render() {
    const { user } = this.props;
    if(!user) {
      return <div>loading</div>
    }

    return (
      <div className="fullScreenSection">
        <div className="positioningContainer">
          <h1>{user.firstName + ' ' + user.lastName}</h1>
          <div className="wrap">
            <h2>{user.totalPoints}</h2>
            <h3>Punkte</h3>
            <p className="center" >
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            </p>
          </div>
            {this.renderLog()}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ user }, ownProps) {
  return { user: user[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchProfile })(UserView);
