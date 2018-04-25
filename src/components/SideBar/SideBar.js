import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { deAuth, logoutUser } from '../../store/actions';
// import './SideBar.css';

class SideBar extends Component {
  logoutUser = async e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  render() {
    return (
      <div className="SideBar">
        <h1 className="SideBar__title">
          Notey <FontAwesome name="fas fa-book" />
          <br />
        </h1>
        <Link to="/">
          <div className="SetIc">
            <FontAwesome name="fas fa-sticky-note" />
            <button className="SideBar__link">View Your Notes</button>
          </div>
        </Link>
        <Link to="/create">
          <div className="SetIc">
            <FontAwesome name="fas fa-plus" />
            <button className="SideBar__link">Create New Note</button>
          </div>
        </Link>
        <div className="SetIc" onClick={e => this.logoutUser(e)}>
          <FontAwesome name="fas fa-sign-out-alt" />
          <button className="SideBar__link">Sign out</button>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, { deAuth, logoutUser })(SideBar));
