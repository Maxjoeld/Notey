/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './CreateNote.css';

class CreateNote extends Component {
  state = {
    title: '',
    content: '',
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const userId = sessionStorage.getItem('id');
    const { title, content } = this.state;
    this.props.createNote({ title, content, userId });
    this.setState({ title: '', content: '' });
  };

  render() {
    const { title, content } = this.state;
    return (
      <div className="CreateNote">
        <form className="CreateNote__Form">
          <h1 className="CreateNote--title"> Create New Note:</h1>
          <input
            className="CreateNote--TitleInput"
            value={title}
            placeholder="Note Title"
            name="title"
            type="text"
            onChange={this.handleInputChange}
            maxLength="32"
            required
          />
          <br />
          <textarea
            className="CreateNote--BodyInput"
            placeholder="Note Content"
            name="content"
            type="text"
            value={content}
            onChange={this.handleInputChange}
            required
          />
          <br />
          <Link to='/'>
            <button
              onClick={() => this.handleSubmit()}
              className="CreateNote__Submit"
              type="submit"
            >
              Save
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

export default CreateNote;
/* eslint-enable */
