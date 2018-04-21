/* eslint-disable */
import React, { component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { SortableElement } from 'react-sortable-hoc';
import './Notes.css';

const Note = SortableElement(props => {
  return (
    <Link to="/view" onClick={() => props.handleNoteIndex(props.note._id)}>
      <li className="Note">
        <div className="Note--NoteTitle">
          <h2>{props.note.title}</h2> <br />
        </div>
        <div className="Note--NoteBody">
          <ReactMarkdown source={props.note.content} />
        </div>
      </li>
    </Link>
  );
});

export default Note;

/* eslint-enable */
