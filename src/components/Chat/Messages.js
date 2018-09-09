import React, { Component } from 'react';
import { connect } from 'react-redux';

class Messages extends Component {
  state = {
    admin: false,
  };

  render() {
    const adminName = this.props.firstName === null ? "message-message continuous-message" : "message-message-admin";
    const userName = this.props.firstName === null ? "message-message user-message" : "message-message";
    return (
      <React.Fragment>
        {this.props.isAdmin ?
          <div className="message-convo admin">
            {this.props.firstName !== null ?
              <div>
                {/* <p className="message-image-message admin" /> */}
                {/* <div className="contact-image"> */}
                  {/* <img className="contact-image" src={this.props.profilePic ? this.props.profilePic.img : null} alt="NicoImage" /> */}
                {/* </div> */}
                <p className="message-firstName admin">
                  {this.props.firstName} {this.props.lastName}
                </p>
              </div>
            : null}
            <p className={adminName}>{this.props.message}</p>
            <p className="message-time">{this.props.time}</p>
          </div>
        :
          <div className="message-convo">
            {this.props.firstName !== null ?
              <div>
                {/* <p className="message-image-message" /> */}
                <p className="message-firstName">
                  {this.props.firstName} {this.props.lastName}
                </p>
              </div>
            : null}
            <p className={userName}>{this.props.message}</p>
            <p>{this.props.time}</p>
          </div>
        }
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    admin: state.admin,
    contact: state.contactName,
    profilePic: state.profile,
  };
};


export default connect(mapStateToProps)(Messages);
