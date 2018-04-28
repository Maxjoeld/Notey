import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import SideBar from './components/SideBar/SideBar';
import NoteList from './components/Notes/NoteList/NoteList';
import CreateNote from './components/Notes/CreateNote/CreateNote';
import ViewNote from './components/Notes/ViewNote/ViewNote';
import EditNote from './components/Notes/EditNote/EditNote';

import Login from './components/Auth/SignIn/SignIn';
import SignUp from './components/Auth/SignUp/SignUp';

import Convo from './components/Chat/Convo';

const App = (props) => {
  const PrivateRoute = ({ component: Comp, ...rest }) => (
    <Route
      {...rest}
      render={compProps =>
        sessionStorage.getItem('id') ? (
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
      <div className='App' >
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        {/* <PrivateRoute component={SideBar} /> */}
        <PrivateRoute exact path="/" component={NoteList} />
        <PrivateRoute exact path="/create" component={CreateNote} />
        <PrivateRoute exact path="/view" component={ViewNote} />
        <PrivateRoute exact path="/edit" component={EditNote} />
        <PrivateRoute exact path="/convo" component={Convo} />
      </div>
    </Router>
  );
};

const mapStateToProps = state => {
  return {
    isAuth: state.isAuthenticated,
  };
};

export default connect(mapStateToProps)(App);
