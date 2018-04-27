import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { deAuth, logoutUser } from '../../actions';
// import './SideBar.css';

const styles = {
  color: 'rgb(224, 255, 254)',
};

class SideBar extends Component {
  logoutUser = async e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  render() {
    return (
      <div className="sidebar">
        <h1 className="sidebar__title">
          Notey <FontAwesome name="fas fa-book" />
          <br />
        </h1>
        {/* <div className="list"> */}
        <div className="sidebar--chat">
        <div className="sidebar--users">
          <p>Welcome</p>
          <p>md809@gmail.com</p>
        </div>
          <p><NavLink to='/mailbox'>MailBox</NavLink></p>
          <p><NavLink to='/convo'>Conversations</NavLink></p>
          <p><NavLink to="/">View Your Notes</NavLink></p>
          <p><NavLink to='/create'>Create New Note</NavLink></p>
          <p style={{ cursor: 'pointer' }} onClick={e => this.logoutUser(e)}>Sign Out</p>
        </div>
        {/* <FontAwesome name="fas fa-sticky-note" />
            <FontAwesome name="fas fa-plus" />
            <FontAwesome name="fas fa-sign-out-alt" /> */}

      </div>
    );
  }
}

export default withRouter(connect(null, { deAuth, logoutUser })(SideBar));
