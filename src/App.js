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

import { handleIdx } from './store/actions/';

const App = props => {
  const PrivateRoute = ({ component: Comp, ...rest }) => (
    <Route
      {...rest}
      render={compProps =>
        props.isAuthenticated ? (
          <Comp {...compProps} {...rest} />
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
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <PrivateRoute exact component={SideBar} />
        <PrivateRoute exact path="/" component={NoteList} handleNoteViewIndex={props.handleIdx} />
        <PrivateRoute exact path="/create" component={CreateNote} />
        <PrivateRoute exact path="/view" component={ViewNote} note={props.notes[props.noteIndex]} />
        <PrivateRoute exact path="/edit" component={EditNote} note={props.notes[props.noteIndex]} />
      </div>
    </Router>
  );
};

const mapStateToProps = state => {
  return {
    notes: state.notes,
    isAuthenticated: state.isAuthenticated,
    noteIndex: state.noteIndex,
  };
};

export default connect(mapStateToProps, { handleIdx })(App);
