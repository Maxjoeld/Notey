/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../CreateNote/CreateNote';

class EditNote extends Component {
  state = {
    _id: '',
    title: '',
    content: '',
  };

  componentDidMount() {
    this.setState({
      _id: this.props.note._id,
      title: this.props.note.title,
      content: this.props.note.content,
    });
  }
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { _id, title, content } = this.state;
    this.props.handleEditNote({ _id, title, content });
    this.setState({ _id: '', title: '', content: '' });
  };

  render() {
    const { title, content } = this.state;
    return (
      <div className='CreateNote'>
        <form className='CreateNote__Form'>
          <h1 className='CreateNote--title'>Update Note:</h1>
          <input
            className='CreateNote--TitleInput'
            value={title}
            placeholder="Note Title"
            name="title"
            type='text'
            onChange={this.handleInputChange}
            maxLength='32'
            required
          />
          <br />
          <textarea
            className='CreateNote--BodyInput'
            placeholder="Note Content"
            name="content"
            type='text'
            value={content}
            cols="100"
            rows="40"
            onChange={this.handleInputChange}
            required
          />
          <br />
          <Link to='/view'>
            <button
              onClick={() => this.handleSubmit()}
              className="CreateNote__Submit"
              type="submit"
            >
              Update
            </button>
          </Link>
        </form>
      </div>
    );
  }
}
/* eslint-enable */
export default EditNote;
