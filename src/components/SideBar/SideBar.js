import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import './SideBar.css';

class SideBar extends Component {
  logoutUser = e => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/notes/logout')
      .then(() => {
        this.props.isAuth();
      })
      .then(() => this.props.history.push('/login'))
      .catch(err => {
        console.log(err);
      });
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
            <button className="SideBar__button">View Your Notes</button>
          </div>
        </Link>
        <Link to="/create">
          <div className="SetIc">
            <FontAwesome name="fas fa-plus" />
            <button className="SideBar__button">Create New Note</button>
          </div>
        </Link>
        {/* <Link to="/login" onClick={(e) => this.logoutUser(e)}> */}
        <div className="SetIc" onClick={e => this.logoutUser(e)}>
          <FontAwesome name="fas fa-sign-out-alt" />
          <button className="SideBar__button">Sign out</button>
        </div>
        {/* </Link> */}
      </div>
    );
  }
}

export default withRouter(SideBar);
