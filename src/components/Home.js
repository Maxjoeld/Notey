import React, { Component } from 'react';
import logo from './SideBar/logo.png';
import home from './home.jpg';
import { NavLink } from 'react-router-dom';

class Home extends Component {
  state = {}
  render() {
    return (
      <div className="Home-header">
        <div className="Home--nav">
          <img src={logo} alt="SideLogo" className="home-logo" />
          {/* <h1 className="home--title">
            Notey
          </h1> */}
            <div className="Home--nav--links">
              <p className="Home--nav--title"><NavLink to="/home">Home</NavLink></p>
              <p className="Home--nav--title"><NavLink to="/about">About Us</NavLink></p>
              <p className="Home--nav--title"><NavLink to="/login">Sign In</NavLink></p>
              <p className="Home--nav--title"><NavLink to="/signup">Sign up</NavLink></p>
            </div>
        </div>
        <img src={home} alt="SideLogo" className="Home--Pic"/>
        {/* <p className="Home--Pic">Picture goes here</p> */}
        <div className="Home--three--boxes">
          <p className="Boxes">Box 1</p>
          <p className="Boxes">Box 2</p>
          <p className="Boxes">Box 3</p>
        </div>
        <p className="Home-bottom" />
      </div>
    );
  }
}

export default Home;
