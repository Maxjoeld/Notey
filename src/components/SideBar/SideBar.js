import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deAuth } from '../../store/actions';
import FontAwesome from 'react-fontawesome';
import './SideBar.css';

class SideBar extends Component {

  logoutUser = async e => {
    e.preventDefault();
    try {
      await axios.post('notes/logout');
      await this.props.deAuth();
      await sessionStorage.removeItem('id');
      await this.props.history.push('/login');
    } catch (err) {
      console.log(err);
    }
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
        <div className="SetIc" onClick={e => this.logoutUser(e)}>
          <FontAwesome name="fas fa-sign-out-alt" />
          <button className="SideBar__button">Sign out</button>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     isAuthenticated: state.isAuthenticated,
//     notes: state.notes,
//   };
// };

export default withRouter(connect(null, { deAuth })(SideBar));
