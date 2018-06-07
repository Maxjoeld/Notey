import React from 'react';
import { connect } from 'react-redux';
import { handleContactIdx } from '../../actions';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Contact = props => {
  return (
    <div className="contact-box" onClick={() => props.handleContactIdx(props.index)}>
      <p className="contact-image" />
      <div className="contact-info">
        <p className="contact-firstName">{props.admin === props.initiator ? props.recipient : null }</p>
        {/* <p className="contact-lastName">{props.lastName}</p> */}
        <p className="contact-time">{props.time}</p>
      </div>
      <p className="contact-body">{props.body}</p>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    admin: state.admin,
  };
};


export default connect(mapStateToProps, { handleContactIdx })(Contact);
