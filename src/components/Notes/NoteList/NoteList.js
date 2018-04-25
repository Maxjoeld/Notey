/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { SortableContainer, arrayMove } from 'react-sortable-hoc';
import { CSVLink } from 'react-csv';
import { connect } from 'react-redux';
import { updateSortedNotes, handleIdx, onSortEnd, sortData, getNotes } from '../../../actions';
import Note from './Note';

// import './Notes.scss';

class NoteList extends Component {
  state = {
    search: '',
    emptyNotes: false,
  };

  componentDidMount() {
    this.props.getNotes();
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const newOrderList = arrayMove(this.props.notes, oldIndex, newIndex);
    this.props.onSortEnd(newOrderList, this.props.notes);
  };

  updateSearch = e => {
    this.setState({ search: e.target.value });
  };

  render() {
    // console.log({"notes":this.state.notes});
    const filteredNotes = this.props.notes.filter(note => {
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
                handleNoteIndex={this.props.handleIdx}
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
          {this.props.sortedNotes ? (
            <h1 className="NotesView__sort" onClick={() => this.props.sortData(this.props.notes)}>
              Sort: Regular
            </h1>
          ) : (
            <h1 className="NotesView__sort" onClick={() => this.props.sortData(this.props.notes)}>
              Sort: Sorted Alphabetically
            </h1>
          )}
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
          notes={this.props.notes}
          onSortEnd={this.onSortEnd}
          handleNoteIndex={this.props.handleIdx}
        />
        {!this.boolEmptyNotes ? (
          <CSVLink className="CSV-Link" data={this.props.notes} filename="lambda-notes.csv">
            Download CSV
          </CSVLink>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes,
    sortedNotes: state.sortedNotes,
  };
};

export default connect(mapStateToProps, {
  updateSortedNotes, handleIdx, sortData, onSortEnd, getNotes
})(NoteList);
