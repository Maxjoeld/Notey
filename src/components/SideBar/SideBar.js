import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";
import FontAwesome from "react-fontawesome";

class SideBar extends Component {
  render() {
    return (
      <div className="SideBar">
        <h1 className="SideBar__title">
          Notey<br />DataBase
        </h1>
        <Link to={"/"}>
            <FontAwesome name="fas fa-sticky-note" />
          <button className="SideBar__button">View Your Notes</button>
        </Link>
        <Link to={"/create"}>
          <button className="SideBar__button">
            <FontAwesome name="fas fa-plus" />Create New Note
          </button>
        </Link>
      </div>
    );
  }
}

export default SideBar;
