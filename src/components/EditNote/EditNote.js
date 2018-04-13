import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../CreateNote/CreateNote';

class EditNote extends Component {
  state = {
    id: 0,
    title: '',
    body: '',
  };

  componentDidMount() {
    this.setState({
      id: this.props.note.id,
      title: this.props.note.title,
      body: this.props.note.body,
    });
  }
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = _ => {
    const { id, title, body } = this.state;
    this.props.handleEditNote({ id, title, body });
    this.setState({ id: 0, title: "", body: "" });
  };

  render() {
    const { title, body } = this.state;
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
            name="body"
            type='text'
            value={body}
            cols="100"
            rows="40"
            onChange={this.handleInputChange}
            required
          />
          <br />
          <Link to={"/view"}>
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
 
export default EditNote;