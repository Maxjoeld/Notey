import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import SideBar from './components/SideBar/SideBar';
import NoteList from './components/NoteList/NoteList';
import CreateNote from './components/CreateNote/CreateNote';
import ViewNote from './components/ViewNote/ViewNote';
import EditNote from './components/EditNote/EditNote';
import SignUp from './components/Auth/SignUp/SignUp';
import Login from './components/Auth/SignIn/SignIn';
import './App.css';


class App extends Component {
  state = {
    noteIndex: 0,
  };

  handleNoteViewIndex = inputID => {
    const state = this.props.notes;
    state.forEach((note, i) => {
      if (note._id === inputID) this.setState({ noteIndex: i });
    });
  };

  render() {
    const PrivateRoute = ({ component: Comp, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          this.props.isAuthenticated ? (
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
            render={() => <Login isAuth={this.isAuth} />}
          />
          <Route exact path="/signup" render={() => <SignUp isAuth={this.isAuth} />} />
          <PrivateRoute exact component={SideBar} />
          <PrivateRoute
            exact
            path="/"
            component={NoteList}
            handleNoteViewIndex={this.handleNoteViewIndex}
          />
          <PrivateRoute
            exact
            path="/create"
            component={CreateNote}
          />
          <PrivateRoute
            exact
            path="/view"
            component={ViewNote}
            note={this.props.notes[this.state.noteIndex]}
          />
          <PrivateRoute
            exact
            path="/edit"
            component={EditNote}
            note={this.props.notes[this.state.noteIndex]}
          />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated,
    notes: state.notes,
  };
};

export default connect(mapStateToProps)(App);
