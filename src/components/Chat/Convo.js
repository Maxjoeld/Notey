import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideBar from '../SideBar/SideBar';
import { getContact } from '../../actions';
import Contact from './Contact';

class Convo extends Component {

  async componentWillMount() {
    await this.props.getContact();
  }

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
            {this.props.contacts.length > 0 ?
              this.props.contacts.map(contact => {
              return <Contact key={contact._id} index={contact._id} username={contact.username} />;
              })
            : null }
          </div>
          <hr />
          <div className="friendChat">
            <div className="friendchat--header">
              <p>{this.props.contact.username}</p>
              <ul style={{ display: 'flex' }}>
                <li> icon </li>
                <li> icon </li>
                <li> icon </li>
              </ul>
            </div>
            <p className="friendchat--textbox" />
            <textarea
              type="text"
              placeholder="Type your message here"
              className="friendChat--search"
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    contacts: state.contacts,
    contact: state.contact,
  };
};

export default connect(mapStateToProps, { getContact })(Convo);

// we simply just want to search for the user then onClick display the user
// in the contactList that is displayed there
