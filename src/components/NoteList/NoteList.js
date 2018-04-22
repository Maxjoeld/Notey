/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { SortableContainer, arrayMove } from 'react-sortable-hoc';
import { CSVLink } from 'react-csv';
// import PropTypes from 'prop-types';
import Note from './Note';

import './Notes.css';

class NoteList extends Component {
  state = {
    notes: this.props.notes,
    search: '',
    emptyNotes: false,
    sortedNotes: true,
    // sortByDate: true,
  };


  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      notes: arrayMove(this.state.notes, oldIndex, newIndex),
    });
    this.props.updateSortedNotes(this.state.notes);
  };
  sortData = state => {
    const notes = [...state];
    if (this.state.sortedNotes) {
      notes.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase());
      this.setState({ notes, sortedNotes: false });
    } else {
      this.setState({ notes, sortedNotes: true });
    }
  };
  updateSearch = e => {
    this.setState({ search: e.target.value });
  };
  handleNoteIndex = index => {
    this.props.handleNoteViewIndex(index);
  };

  // sortByDate = state => {
  //   const notes = [...state];
  //   if (this.state.sortByDate) {
  //     notes.sort((a, b) => a.date > b.date);
  //     this.setState({ notes, sortedByDate: true });
  //   } else {
  //     this.setState({ notes, sortedByDate: false });
  //   }
  // };

  render() {
    // console.log({"notes":this.state.notes});
    const filteredNotes = this.state.notes.filter(note => {
      return note.title.toLowerCase().includes(this.state.search.toLowerCase());
    });

    const SortableList = SortableContainer(props => {
      return (
        <ul className="Notes--comp">
          {filteredNotes.map((note, index) => {
            return (
              <Note
                key={note._id}
                note={note}
                index={index}
                title={note.title}
                content={note.content}
                handleNoteIndex={props.handleNoteIndex}
              />
            );
          })}
        </ul>
      );
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
            onChange={this.updateSearch}
          />
          {/* eslint-disable */}
          {this.state.sortedNotes ? (
            <h1
              className="NotesView__sort"
              onClick={() => this.sortData(this.state.notes)}
            >
              Sort: Regular
            </h1>
          ) :
            <h1 className="NotesView__sort" onClick={() => this.sortData(this.props.notes)}>
              Sort: Sorted Alphabetically
            </h1> 
          }
          {/* eslint-enable */}
        </div>
        {this.state.emptyNotes ? (
          <h3>
            It looks like you don’t have any notes yet, click ’Create New Note’ to get started!
          </h3>
        ) : null}
        <SortableList
          pressDelay={150}
          lockToContainerEdges
          axis="xy"
          notes={this.state.notes}
          onSortEnd={this.onSortEnd}
          handleNoteIndex={this.handleNoteIndex}
        />
        {!this.boolEmptyNotes ? (
          <CSVLink className="CSV-Link" data={this.state.notes} filename="lambda-notes.csv">
            Download CSV
          </CSVLink>
        ) : null}
      </div>
    );
  }
}

export default NoteList;
