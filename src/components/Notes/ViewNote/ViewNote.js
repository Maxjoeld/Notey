/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

import DeleteNote from '../DeleteNote/DeleteNote';
// import './ViewNote.css';

class NoteView extends Component {
  state = {
    id: 0,
    _id: '',
    title: '',
    content: '',
    boolModal: false,
  };


  componentDidMount() {
    this.setState({
      // id: this.props.note.id,
      _id: this.props.note._id,
      title: this.props.note.title,
      content: this.props.note.content,
    });
  }
  toggleModal = _ => {
    this.state.boolModal = !this.state.boolModal;
    this.forceUpdate();
  };

  render() {
    const { _id, title, content } = this.state;
    return (
      <div className="NoteView">
        {this.state.boolModal ? (
          <div>
            <DeleteNote
              _id={_id}
              toggleModal={this.toggleModal}
              handleDeleteNote={this.props.handleDeleteNote}
            />
          </div>
        ) : null}
        <div className="NoteView--Links">
          <div>
            <Link className="NoteView--Links__Link" to='/edit'>
              edit
            </Link>
          </div>
          <div>
            <a
              className="NoteView--Links__Link"
              onClick={() => this.toggleModal()}
            >
              delete
            </a>
          </div>
        </div>
        <div>
          <h2 className="SectionTitle">{title}</h2>
          <ReactMarkdown className="SectionBody" source={content} />
        </div>
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

export default connect(mapStateToProps)(NoteView);
