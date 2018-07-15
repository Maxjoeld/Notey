import React, { Component } from 'react';
import logo from './SideBar/logo.png';
import home from './home.jpg';
import { Link } from 'react-router-dom';

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
              <p className="Home--nav--title">Home</p>
              <p className="Home--nav--title"><Link to="/login">Sign In</Link></p>
              <p className="Home--nav--title"><Link to="/signup">Sign up</Link></p>
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
