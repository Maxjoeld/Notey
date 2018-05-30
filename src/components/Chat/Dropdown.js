import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadNewUser, handleNewUserIdx } from '../../actions';


class Dropdown extends Component {
  state = {}

  newUser = (userId) => {
    // we don't want to create a new converstaion yet. We want to just show the user the new user.
    console.log(userId);
    this.props.handleNewUserIdx(userId);
    // this.props.loadNewUser(userId);
  }

  render() {
    return (
      <div>
        {this.props.users.map(user => {
      /* eslint-disable */
          return (
            <div user={user} key={user._id} onClick={() => this.newUser(user._id)}>
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

export default connect(mapStateToProps, { loadNewUser, handleNewUserIdx })(Dropdown);
