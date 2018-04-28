import React, { Component } from 'react';
import SideBar from '../SideBar/SideBar';

class Convo extends Component {
  state = {};
  render() {
    return (
      <div className="Master">
        <SideBar />
        <div className="friendcomp">
          <div className="friendslist">
            <p> Friends </p>
            <p> 20 Conversations </p>
            <input
              type="text"
              placeholder="Search contacts"
              className="friendlist--search"
              value={this.state.search}
              onChange={this.updateSearch}
            />
              <p className="friendlist--contacts" />
              <p className="friendlist--contacts" />
              <p className="friendlist--contacts" />
              <p className="friendlist--contacts" />
              <p className="friendlist--contacts" />
              <p className="friendlist--contacts" />
              <p className="friendlist--contacts" />
              <p className="friendlist--contacts" />
              <p className="friendlist--contacts" />
              <p className="friendlist--contacts" />
              <p className="friendlist--contacts" />
              <p className="friendlist--contacts" />
          </div>
          <hr />
          <div className="friendChat">
            <div className="friendchat--header">
              <p> Namegoes Here </p>
              <ul style={{ display: "flex" }}>
              <li> icon </li>
              <li> icon </li>
              <li> icon </li>
              </ul>
            </div>
            <p className="friendchat--textbox" />
            <textarea type="text" placeholder="Type your message here" className="friendChat--search" />
          </div>
        </div>
      </div>
    );
  }
}

export default Convo;
