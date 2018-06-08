import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { deAuth, logoutUser } from '../../actions';
import Nico from './Nico.jpg';
import logo from './logo.png';

class SideBar extends Component {
  logoutUser = async e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  render() {
    return (
      <div className="sidebar">
        {/* <FontAwesome name="fas fa-book" /> */}
        <img src={logo} alt="SideLogo" className="Side-logo" />
        <h1 className="sidebar--title">
          Notey
          <br />
        </h1>
        <div className="sidebar--chat">
          <div className="sidebar--users">
            <p>Welcome</p>
            <div className="Nico--cropper">
              <img src={Nico} alt="NicoImage" className="NicoPic" />
            </div>
            <p>md809@gmail.com</p>
          </div>
          {/* We can also add activeClassName to make our own classes instead of default .active */}
          <p><NavLink to='/mailbox'><i className="fas fa-envelope-open fa-fw" />MailBox</NavLink></p>
          <p><NavLink exact to='/convo'><i className="fas fa-comments fa-fw" />Conversations</NavLink></p>
          <p><NavLink exact to="/"><i className="fas fa-sticky-note fa-fw" />View Your Notes</NavLink></p>
          <p><NavLink exact to='/create'><i className="fas fa-plus fa-fw" />Create New Note</NavLink></p>
          <p
            style={{ cursor: 'pointer', color: 'rgb(129, 129, 129)' }}
            onClick={e => this.logoutUser(e)}
          ><i className="fas fa-sign-out-alt fa-fw" />Sign Out
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, { deAuth, logoutUser })(SideBar));
