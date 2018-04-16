/* eslint-disable */

import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

import DeleteNote from '../DeleteNote/DeleteNote';
import './ViewNote.css';

class NoteView extends Component {
  state = {
    id: 0,
    title: '',
    body: '',
    boolModal: false,
  };


  componentDidMount() {
    this.setState({
      id: this.props.note.id,
      title: this.props.note.title,
      body: this.props.note.body,
    });
  }
  toggleModal = () => {
    this.state.boolModal = !this.state.boolModal;
    this.forceUpdate();
  };

  render() {
    const { id, title, body } = this.state;
    return (
      <div className="NoteView">
        {this.state.boolModal ? (
          <div>
            <DeleteNote
              id={id}
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
          <ReactMarkdown className="SectionBody" source={body} />
        </div>
      </div>
    );
  }
}

/* eslint-enable */
export default NoteView;
