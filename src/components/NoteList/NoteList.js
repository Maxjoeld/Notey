import React, { Component } from "react";
import { SortableContainer, arrayMove } from "react-sortable-hoc";
import { CSVLink } from "react-csv";
import Note from "./Note";

import "./Notes.css";

export default class NoteList extends Component {
  boolEmptyNotes = true;
  sortedNotes = true;
  state = {
    notes: this.props.notes,
    search: ""
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

  updateSearch = e => {
    this.setState({ search: e.target.value });
  };

  sortData = (state) => {
    const notes = [...state];
    if (this.sortedNotes) {
      notes.sort((a, b) => {
        return a.title > b.title;
      });
      this.sortedNotes = false;
      this.setState({ notes: notes });
    } else {
      this.sortedNotes = true;
      this.setState({ notes: notes });
    }
  };

  render() {
    const SortableList = SortableContainer(props => {
      return (
        <ul className="Notes--comp">
          {filteredNotes.map((note, index) => {
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

    let filteredNotes = this.state.notes.filter(note => {
      return note.title.toLowerCase().includes(this.state.search.toLowerCase());
    });
    return (
      <div className="NotesView">
        <div className="NotesView--header">
          <h2 className="NotesView__empty">Your Notes: </h2>
          <input
            type="text"
            placeholder="SearchEngine"
            className="NotesView__search"
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
          />
          {this.sortedNotes ? (
            <h1 className="NotesView__sort" onClick={() =>this.sortData(this.state.notes)}>
              Sort: Regular 
            </h1>
          ) : (
            <h1 className="NotesView__sort" onClick={() => this.sortData(this.props.notes)}>
              Sort: Sorted Alphabetically 
            </h1>
          )}
        </div>
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
