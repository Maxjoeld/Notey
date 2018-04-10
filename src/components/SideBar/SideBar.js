import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';

class SideBar extends Component {
  render() {
    return (
      <div className ="SideBar">
        <h1 className="SideBar__title">Notey<br/>DataBase</h1>
        <Link to={'/'}><button className="SideBar__button">View your note</button></Link>
        <Link to={'/create'}><button className="SideBar__button">Create New Note</button></Link>
      </div>
    );
  }
}

export default SideBar;