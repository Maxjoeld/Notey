import React, { Component } from 'react';
import openSocket from 'socket.io-client';

import { connect } from 'react-redux';
import { getContact, getConversation } from '../../actions';
import SideBar from '../SideBar/SideBar';
import Contact from './Contact';
import Messages from './Messages';

const socket = openSocket('http://localhost:8000');

class Convo extends Component {
  async componentWillMount() {
    await this.props.getContact();
  }

  sendSms = (e) => {
    e.preventDefault();
    console.log(this.props.contact._id);
    // axios call with the private messenger's id
    // We now do user.findById
    // once we find the user, we populate the chat
    // we return the chat data and load it on the screen
    // this.props.sendSms(this.props.contact._id);
  };


  render() {
    return (
      <div className="Master">
        <SideBar />
        <div className="friendcomp">
          <div className="friendslist">
            <p> Friends </p>
            <p> 20 Conversations </p>
            <form>
              <input
                type="text"
                placeholder="Search contacts"
                className="friendlist--search"
                // value={this.state.search}
                // onClick={this.props.getContact}
              />
            </form>
            {this.props.contacts.length > 0
              ? this.props.contacts.map(person => {
                  return (
                    <Contact
                      key={person._id}
                      index={person._id}
                      body={person.body.slice(0, 40)}
                      firstName={person.author.profile.firstName}
                      lastName={person.author.profile.lastName}
                      time={person.createdAt.split('').splice(11, 5).join('')}
                    />
                    );
                })
              : null}
          </div>
          <hr className="convo-hr" />
          <form className="friendChat">
            <div className="friendchat--header">
              <p className="friendchat--user">{this.props.contact._id}</p>
              <ul style={{ display: 'flex' }}>
                <li> icon </li>
                <li> icon </li>
                <li> icon </li>
              </ul>
            </div>
            <div className="friendchat--textbox">
              {this.props.conversation ?
                this.props.conversation.map(convo => {
                  return (
                    <Messages
                      key={convo._id}
                      index={convo._id}
                      message={convo.body}
                      firstName={convo.author.profile.firstName}
                      lastName={convo.author.profile.lastName}
                      time={convo.createdAt.split('').splice(11, 5).join('')}
                    />
                  );
                })
              : null}
            </div>
            <textarea
              type="text"
              placeholder="Type your message here"
              className="friendChat--search"
            />
            <button
              className="CreateNote__Submit"
              type="submit"
              onClick={(e) => this.sendSms(e)}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    contacts: state.contacts,
    contact: state.contact,
    conversation: state.conversation,
  };
};

export default connect(mapStateToProps, { getContact, getConversation })(Convo);

// we simply just want to search for the user then onClick display the user
// in the contactList that is displayed there
