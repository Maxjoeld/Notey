import React from 'react';
import { connect } from 'react-redux';
import { handleContactIdx } from '../../actions';

const Contact = props => {
  return (
    <div
      className="contact-box"
      onClick={() => props.handleContactIdx(props.index)}
    >
      <p className="contact-image" />
      <p className="contact-username">{props.username}</p>
    </div>
  );
};

export default connect(null, { handleContactIdx })(Contact);
