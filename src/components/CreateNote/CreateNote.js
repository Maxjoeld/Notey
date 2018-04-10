import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./CreateNote.css";

class CreateNote extends Component {
  state = {
    title: "",
    body: ""
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = _ => {
    const { title, body } = this.state;
    this.props.createNote({ title, body });
    this.setState({ title: "", body: "" });
  };

  render() {
    const { title, body } = this.state;
    return (
      <div className='CreateNote'>
        <form className='CreateNote__Form'>
          <h1 className='CreateNote--title'> Create New Note:</h1>
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
            onChange={this.handleInputChange}
            required
          />
          <br />
          <Link to={"/"}>
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
