import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replyMessage } from '../../actions';
import Messages from './Messages';

class ChatBox extends Component {
  state = {
    message: '',
  };
  reply = (e) => {
    e.preventDefault();
    const { message } = this.state;
    this.props.replyMessage({ message });
    this.setState({ message: '' });
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { message } = this.state;
    return (
      <div>
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
          <input
            type="text"
            placeholder="Type your message here"
            className="friendChat--search"
            value={message}
            name="message"
            onChange={this.handleInputChange}
            required
          />
          <button
            className="CreateNote__Submit"
            type="submit"
            onClick={(e) => this.reply(e)}
          >
            Send
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    contact: state.contact,
    conversation: state.conversation,
  };
};

export default connect(mapStateToProps, { replyMessage })(ChatBox);
