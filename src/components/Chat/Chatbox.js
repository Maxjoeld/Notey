import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replyMessage, loadNewUser } from '../../actions';
import Messages from './Messages';

import FontAwesome from 'react-fontawesome';

class ChatBox extends Component {
  state = {
    message: '',
  };
  reply = e => {
    e.preventDefault();
    const { message } = this.state;
    this.props.replyMessage({ message });
    this.setState({ message: '' });
  };

  newContact = e => {
    e.preventDefault();
    const { message } = this.state;
    const recipient = this.props.user._id;
    this.props.loadNewUser(recipient, { message });
    this.setState({ message: '' });
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { message } = this.state;
    let user;
    if (this.props.newContact) {
      user = `${this.props.recipient[0]} ${this.props.recipient[1]}`;
    } else if (this.props.contact) {
      user = this.props.contact;
    }
    return (
      <div>
        <form className="friendChat">
          <div className="friendchat--header">
            <p className="friendchat--user">{user}</p>
            <div className="iconparent">
              <FontAwesome name="fas fa-phone fa-2x" />
              <FontAwesome name="fas fa-video fa-2x" />
              <FontAwesome name="fas fa-ellipsis-v fa-2x" />
            </div>
          </div>
          <div className="friendchat--textbox">
            {this.props.newContact ? ''
              : this.props.conversation ?
                  this.props.conversation.map((convo, i) => {
                    return (
                      <Messages
                        key={convo._id}
                        index={convo._id}
                        message={convo.body}
                        firstName={i > 0 &&
                          this.props.conversation[i - 1].author.firstName ===
                          convo.author.firstName
                            ? null
                            : convo.author.firstName
                        }
                        lastName={i > 0 &&
                          this.props.conversation[i - 1].author.lastName ===
                          convo.author.lastName
                            ? null
                            : convo.author.lastName
                        }
                        isAdmin={this.props.admin === `${convo.author.firstName} ${convo.author.lastName}`}
                        time={convo.createdAt
                          .split('')
                          .splice(11, 5)
                          .join('')}
                      />
                    );
                  })
                : null}
          </div>
          <div className="friend-search-bar">
            <FontAwesome name="far fa-comment-alt" />
            <input
              type="text"
              placeholder="Type your message here..."
              className="friendChat--search"
              value={message}
              name="message"
              onChange={this.handleInputChange}
              required
            />
            <button
              className="friendChat--submit"
              type="submit"
              onClick={e => (this.props.newContact ? this.newContact(e) : this.reply(e))}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    contact: state.contactName,
    conversation: state.conversation,
    newContact: state.newContact,
    user: state.user,
    recipient: state.recipient,
    admin: state.admin,
  };
};

export default connect(mapStateToProps, { replyMessage, loadNewUser })(ChatBox);
