import React, { Component } from 'react';

import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8000');


class Messages extends Component {
  state = {}

  render() { 
    return (
      <div>
        <p className="contact-firstName">{this.props.firstName}</p>
        <p className="contact-firstName">{this.props.lastName}</p>
        <p>{this.props.message}</p>
        <p>{this.props.time}</p>
      </div>
    );
  }
}

export default Messages;
