import React, { Component } from 'react';
import { connect } from 'react-redux';

class Messages extends Component {
  state = {
    admin: false,
  };

  componentWillMount() {
    const name = `${this.props.firstName} ${this.props.lastName}`;
    if (this.props.admin === name) {
      this.adminOrUser();
    }
  }
  adminOrUser = () => {
    this.setState({ admin: !this.state.admin });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.admin ?
            <div className="message-convo admin">
              <p className="message-image-message admin" />
              <p className="message-firstName admin">
                {this.props.firstName} {this.props.lastName}
              </p>
              <p className="message-message admin">{this.props.message}</p>
              <p className="message-time">{this.props.time}</p>
            </div>
        :
          <div className="message-convo">
            <p className="message-image-message" />
            <p className="message-firstName">
              {this.props.firstName} {this.props.lastName}
            </p>
            <p className="message-message">{this.props.message}</p>
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
  };
};


export default connect(mapStateToProps)(Messages);
