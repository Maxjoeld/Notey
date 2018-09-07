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
        <div className="Home-three-boxes">
          <div className="Boxes">
            <p className="home-Box-title">Create</p>
            <p>You can send messages to other users and also share notes that 
              you created
            </p>
            <i className="fas fa-plus plus" />
          </div>
          <div className="Boxes">
            <p className="home-Box-title">Send</p>
            <p>You can send messages to other users and also share notes that 
              you created
            </p>
            <i className="far fa-paper-plane" />
          </div>
        </div>
        {/* <p className="Home-bottom" /> */}
      </div>
    );
  }
}

export default Home;
