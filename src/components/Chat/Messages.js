import React from 'react';

const Messages = (props) => {
  return (
    <div>
      <p className="contact-firstName">{props.firstName}</p>
      <p className="contact-firstName">{props.lastName}</p>
      <p>{props.message}</p>
      <p>{props.time}</p>
    </div>
  );
};

export default Messages;
