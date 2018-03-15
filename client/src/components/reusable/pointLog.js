import React, { Component } from 'react';
import _ from 'lodash';


export class UserLog extends Component {
  state = {
    log: true,
    class: 'card-log'
  }

  handleOnClick = () => {
    this.setState({
      log: !this.state.log,
    })
    if(this.state.log) {
      this.setState({
        class: 'card-log open overflow-scroll'
      })
    } else {
      this.setState({
        class: 'card-log closed overflow-scroll'
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
        <div className="container-small shadow-small" key={pointLog._id}>
          <p>{date.toLocaleDateString('de-DE', dateOptions).replace(/,/g, ' -')} | Clouds: {pointLog.points}</p>
          <p className="space-top"><span className="accent">Beschreibung: </span>{pointLog.description}</p>
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
      <div>
        <div className={this.state.class}>
          <div className='container'>
            {this.handleLogList()}
          </div>
        </div>
        <button className="btn fixed-right position rounded shadow-big" onClick={this.handleOnClick}>
          {text}
        </button>
      </div>
    );
  }

  render(){
    return(
      <div>
        {this.renderLog()}
      </div>
    );
  }
}
