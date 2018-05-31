import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import { connect } from 'react-redux';
import { loadNewUser, handleNewUserIdx, newContact } from '../../actions';

class Dropdown extends Component {
  state = {
    showDropDown: true,
  }

  newUser = (userId) => {
    this.props.handleNewUserIdx(userId);
    this.props.newContact();
  }
  handleClickOutside = () => {
    this.props.showDrop();
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

let MyComponent = onClickOutside(Dropdown);
MyComponent = connect(mapStateToProps, { loadNewUser, handleNewUserIdx, newContact })(MyComponent)

export default MyComponent;
