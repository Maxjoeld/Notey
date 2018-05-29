import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadNewUser } from '../../actions';


class Dropdown extends Component {
  state = {}

  render() {
    return (
      <div>
        {this.props.users.map(user => {
      /* eslint-disable */ 
          return (
            <div user={user} key={user._id}>
              <p className="dropdown-user" onClick={() => this.props.loadNewUser(user._id)}>{user.username}</p>
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

export default connect(mapStateToProps, { loadNewUser })(Dropdown);
