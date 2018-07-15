import React, { Component } from 'react';
// import openSocket from 'socket.io-client';

import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { loadConvos, getConversation, getUsers } from '../../actions';
import SideBar from '../SideBar/SideBar';
import ContactList from './ContactList';
import Chatbox from './Chatbox';
import Dropdown from './Dropdown';

// const socket = openSocket('http://localhost:8000');

class Convo extends Component {
  state = {
    search: '',
    showDropDown: false,
  };
  async componentWillMount() {
    await this.props.loadConvos();
    await this.props.getUsers();
  }

  // componentWillUnmount() {
  //   socket.emit('leave conversation', this.props.contact.conversationId);
  // }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  showDropDown = () => {
    this.setState({ showDropDown: !this.state.showDropDown });
  }


  render() {
    const { search } = this.state;
    return (
      <div className="Master">
        <SideBar />
        <div className="friendcomp">
          <div className="friendslist">
            <p> <i className="fas fa-users fa-lg fa-fw" />Friends </p>
            {this.props.contacts ?
              <p> {this.props.contacts.length} Conversations </p>
            : null
            }
            <form className="form">
              <FontAwesome name="fas fa-search" />
              <input
                type="text"
                placeholder="Search..."
                className="friendlist--search"
                value={search}
                name='search'
                autoComplete="off"
                onChange={this.handleInputChange}
                onClick={() => this.showDropDown()}
              />
              {this.state.showDropDown ?
                <Dropdown showDrop={this.showDropDown} /> : null
              }
            </form>
            {this.props.contacts
              ? this.props.contacts.map(person => {
                  return (
                    <ContactList
                      key={person._id}
                      index={person._id}
                      body={person.body.slice(0, 40)}
                      firstName={person.author.firstName}
                      lastName={person.author.lastName}
                      time={person.createdAt.split('').splice(11, 5).join('')}
                      convoId={person.conversationId}
                      initiator={person.conversationId.initiator}
                      recipient={person.conversationId.recipient}
                    />
                  );
                })
              : null}
          </div>
          <hr className="convo-hr" />
          <Chatbox />
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
    users: state.users,
  };
};

export default connect(mapStateToProps, { loadConvos, getUsers, getConversation })(Convo);
