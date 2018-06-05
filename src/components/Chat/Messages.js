import React, { Component } from 'react';

class Messages extends Component {
  state = {}

  render() {
    return (
      <div className= "message-convo">
        <p className="message-image-message" />
        <p className="message-firstName">{this.props.firstName} {this.props.lastName}</p>
        {/* <p className="contact-firstName">{this.props.lastName}</p> */}
        <p className="message-message">{this.props.message}</p>
        <p>{this.props.time}</p>
      </div>
    );
  }
}

export default Messages;
