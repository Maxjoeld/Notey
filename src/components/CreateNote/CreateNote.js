/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNote } from '../../store/actions';
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

  handleSubmit = (e) => {
    e.preventDefault();
    const userId = sessionStorage.getItem('id');
    const { title, content } = this.state;
    this.props.createNote({ title, content, userId });
    this.setState({ title: '', content: '' });
    this.props.history.push('/');
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
            <button
              onClick={(e) => this.handleSubmit(e)}
              className="CreateNote__Submit"
              type="submit"
            >
              Save
            </button>
        </form>
      </div>
    );
  }
}

export default connect(null, { createNote })(CreateNote);
/* eslint-enable */
