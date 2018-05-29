import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dropdown extends Component {
  state = {}
  render() {
    return (
      <div>
        {this.props.users.map(user => {
          return (
            <div user={user} key={user._id}>
              <p className="dropdown-user">{user.username}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps)(Dropdown);
