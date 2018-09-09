import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleContactIdx } from '../../actions';
import icon from './user.png';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
class Contact extends Component {
  state = {}
  render() {
    let user;
    if (this.props.admin === this.props.initiator) {
      user = this.props.recipient;
    } else {
      user = this.props.initiator;
    }
    return (
      <div className="contact-box" onClick={() => this.props.handleContactIdx(this.props.index, user)}>
        <img src={icon} alt="user-icon"className="contact-image" />
        <div className="contact-info">
          <p className="contact-firstName">{user}</p>
          <p className="contact-time">{this.props.time}</p>
        </div>
        <p className="contact-body">{this.props.body}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    admin: state.admin,
  };
};


export default connect(mapStateToProps, { handleContactIdx })(Contact);
