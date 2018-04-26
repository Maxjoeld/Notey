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
        <div className="list">
        <div className="sidebar--users">
          <p>Maximo Delarosa</p>
          <p>Welcome md809@gmail.com</p>
        </div>
        <div className="sidebar--chat">
          <p>MailBox</p>
          <p>Conversations</p>
        </div>
        <Link exact to="/">
          <div className="sidebar--links">
            <FontAwesome name="fas fa-sticky-note" />
            <button className="sidebar--links__link">View Your Notes</button>
          </div>
        </Link>
        <NavLink to="/create">
          <div className="sidebar--links">
            <FontAwesome name="fas fa-plus" />
            <button className="sidebar--links__link">Create New Note</button>
          </div>
        </NavLink>
        <div className="sidebar--links" onClick={e => this.logoutUser(e)}>
          <FontAwesome name="fas fa-sign-out-alt" />
          <button className="sidebar--links__link">Sign out</button>
        </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, { deAuth, logoutUser })(SideBar));
