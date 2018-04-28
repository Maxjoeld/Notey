import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import NoteList from './components/Notes/NoteList/NoteList';
import CreateNote from './components/Notes/CreateNote/CreateNote';
import ViewNote from './components/Notes/ViewNote/ViewNote';
import EditNote from './components/Notes/EditNote/EditNote';

import Login from './components/Auth/SignIn/SignIn';
import SignUp from './components/Auth/SignUp/SignUp';

import Convo from './components/Chat/Convo';

const App = () => {
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
      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute exact path="/" component={NoteList} />
          <PrivateRoute path="/create" component={CreateNote} />
          <PrivateRoute path="/view" component={ViewNote} />
          <PrivateRoute path="/edit" component={EditNote} />
          <PrivateRoute path="/convo" component={Convo} />
        </Switch>
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
