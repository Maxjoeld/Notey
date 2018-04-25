/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { editNote } from '../../../actions';

// import '../CreateNote/CreateNote';

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

  handleSubmit = async (e) => {
      e.preventDefault();
      const { _id, title, content } = this.state;
    try {
      await this.props.editNote({ _id ,title, content }, _id);
      await this.setState({ _id: '', title: '', content: '' });
      await this.props.history.push('/view');
    } catch(err) {
      console.log('error');
    }
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
            <button
              onClick={(e) => this.handleSubmit(e)}
              className="CreateNote__Submit"
              type="submit"
            >
              Update
            </button>
        </form>
      </div>
    );
  }
}
/* eslint-enable */
const mapStateToProps = state => {
  return {
    note: state.notes[state.noteIndex],
  };
};

export default connect(mapStateToProps, { editNote })(EditNote);
