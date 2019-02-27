import React, { Component } from 'react';
import logo from './SideBar/logo.png';
import home from './home.jpg';
import { NavLink, Link } from 'react-router-dom';
import {
  LazyLoadImage
} from 'react-lazy-load-image-component';
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
            <p className="Home--nav--title"><NavLink className="link-hover" to="/home">Home</NavLink></p>
            {/* <p className="Home--nav--title"><NavLink to="/about">About Us</NavLink></p> */}
            <p className="Home--nav--title"><NavLink className="link-hover" to="/login">Sign In</NavLink></p>
            <p className="Home--nav--title"><NavLink className="link-hover" to="/signup">Sign up</NavLink></p>
          </div>
        </div>
        <div className="Home-img">
          <LazyLoadImage
            src={home}
            alt="SideLogo"
            className="Home--Pic"
            effect="blur"
          />
            <div className="Home-type">
              Create <br />Read <br/> Send <br />
              <Link to="/signup">
                <button className="Home-button">Sign up</button>
              </Link>
            </div>
        </div>
        {/* <p className="Home--Pic">Picture goes here</p> */}
        <div className="Home-three-boxes">
          <div className="Boxes">
            <p className="home-Box-title">Create</p>
            <p>Create notes to your liking </p>
            <i className="fas fa-plus plus" />
          </div>
          <div className="Boxes">
            <p className="home-Box-title">Send</p>
            <p>Send messages to other users and also share notes that 
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
