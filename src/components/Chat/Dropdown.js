import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import { connect } from 'react-redux';
import { loadNewUser, handleNewUserIdx } from '../../actions';

class Dropdown extends Component {
  state = {
    showDropDown: true,
  }

  newUser = (userId) => {
    // we don't want to create a new converstaion yet. We want to just show the user the new user.
    console.log(userId);
    this.props.handleNewUserIdx(userId);
    // this.props.loadNewUser(userId);
  }
  handleClickOutside = evt => {
    console.log(evt);
    this.setState({ showDropDown: !this.state.showDropDown });
  }

  render() {
    return (
      <div>
        {this.state.showDropDown ?
          <div className="dropdown">
            {this.props.users.map(user => {
          /* eslint-disable */
              return (
                <div user={user} key={user._id} onClick={() => this.newUser(user._id)}>
                  <p className="dropdown-user">{user.username}</p>
                </div>
              );
            })}
          </div>
        : null}
    </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    users: state.users,
  };
};

export default onClickOutside(connect(mapStateToProps, { loadNewUser, handleNewUserIdx })(Dropdown));
