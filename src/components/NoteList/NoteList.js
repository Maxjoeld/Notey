import React, { Component } from "react";
import { SortableContainer, arrayMove } from "react-sortable-hoc";
import { CSVLink } from "react-csv";
import Note from "./Note";

import "./Notes.css";

const SortableList = SortableContainer(props => {
  return (
    <ul className="Notes--comp">
      {props.notes.map((note, index) => {
        return (
          <Note
            key={note.id}
            note={note}
            index={index}
            title={note.title}
            body={note.body}
            handleNoteIndex={props.handleNoteIndex}
          />
        );
      })}
    </ul>
  );
});

export default class NoteList extends React.Component {
  boolEmptyNotes = true;

  state = {
    notes: this.props.notes
  };

  componentWillMount() {
    if (this.state.notes.length > 0) {
      this.boolEmptyNotes = false;
    } else {
      this.boolEmptyNotes = true;
    }
  }

  handleNoteIndex = index => {
    this.props.handleNoteViewIndex(index);
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      notes: arrayMove(this.state.notes, oldIndex, newIndex)
    });
    this.props.updateSortedNotes(this.state.notes);
  };

  render() {
    return (
      <div className="NotesView">
        <h2 className="NotesView__empty">
          Your Notes:{" "}
          <input placeholder="SearchEngine" className="NotesView--search" />
        </h2>
        {this.boolEmptyNotes ? (
          <h3>
            It looks like you don't have any notes yet, click "Create New Note"
            to get started!
          </h3>
        ) : null}
        <SortableList
          pressDelay={90}
          lockToContainerEdges={true}
          axis={"xy"}
          notes={this.state.notes}
          onSortEnd={this.onSortEnd}
          handleNoteIndex={this.handleNoteIndex}
        />
        {!this.boolEmptyNotes ? (
          <CSVLink
            className="CSV-Link"
            data={this.state.notes}
            filename={"lambda-notes.csv"}
          >
            Download CSV
          </CSVLink>
        ) : null}
      </div>
    );
  }
}
