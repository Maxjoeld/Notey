import React, { Component } from 'react';

class Home extends Component {
  state = {}
  render() {
    return (
      <div className="Home-header">
          <ul className="Home--nav">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact us</li>
          </ul>
        <p className="Home--Pic">Picture goes here</p>
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
