import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

import SideBar from './components/SideBar/SideBar';
import NoteList from './components/NoteList/NoteList';
import CreateNote from './components/CreateNote/CreateNote';
import ViewNote from './components/ViewNote/ViewNote';
import EditNote from './components/EditNote/EditNote';
import Notes from './data';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/SignIn';
import './App.css';

class App extends Component {
  state = {
    notes: Notes,
    isAuthenticated: false,
  };
  nextId = 0;
  noteIndex = 5;

  handleNoteViewIndex = inputId => {
    for (let i = 0; i < this.state.notes.length; i++) {
      if (this.state.notes[i].id === inputId) this.noteIndex = i;
    }
  };

  handleCreateNote = inputNote => {
    const newNote = {
      id: this.nextId++,
      title: inputNote.title,
      body: inputNote.body,
    };
    const newNotes = [...this.state.notes, newNote];
    this.setState({ notes: newNotes });
  };

  handleEditNote = inputNote => {
    const editedNote = {
      id: inputNote.id,
      title: inputNote.title,
      body: inputNote.body,
    };
    const editedNotes = [...this.state.notes];
    editedNotes.splice(this.noteIndex, 1, editedNote);
    this.setState({ notes: editedNotes });
  };

  handleDeleteNote = inputId => {
    const lessNotes = this.state.notes.filter(note => note.id !== inputId);
    this.setState({ notes: lessNotes });
  };

  updateSortedNotes = sortedNotes => {
    this.setState({
      notes: sortedNotes,
    });
  };

  isAuth = () => {
    this.setState({ isAuthenticated: !false });
      <Link to="/" />
  }

  render() {
    const PrivateRoute = ({ component: Comp, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          this.state.isAuthenticated ? (
            <Comp {...props} {...rest} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
              }}
            />
          )
        }
      />
    );
    return (
      <Router>
        <div className="App">
          <Route
            exact
            path="/login"
            render={() => (
              <Login
                isAuthenticated={this.isAuth}
              />
            )}
          />
          <Route exact path="/signup" component={SignUp} />
          <PrivateRoute exact component={SideBar} />
          <PrivateRoute
            exact
            path="/"
            component={NoteList}
            notes={this.state.notes}
            handleNoteViewIndex={this.handleNoteViewIndex}
            updateSortedNotes={this.updateSortedNotes}
          />
          <PrivateRoute
            exact
            path="/create"
            component={CreateNote}
            createNote={this.handleCreateNote}
          />
          <PrivateRoute
            exact
            path="/view"
            component={ViewNote}
            note={this.state.notes[this.noteIndex]}
            toggleModal={this.toggleModal}
            handleDeleteNote={this.handleDeleteNote}
          />
          <PrivateRoute
            exact
            path="/edit"
            component={EditNote}
            note={this.state.notes[this.noteIndex]}
            handleEditNote={this.handleEditNote}
          />
        </div>
      </Router>
    );
  }
}

export default App;
