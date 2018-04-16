import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import './SideBar.css';

const SideBar = () => {
  return (
    <div className="SideBar">
      <h1 className="SideBar__title">
        Notey <FontAwesome name="fas fa-book" />
        <br />DataBase
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
    </div>
  );
};

export default SideBar;
