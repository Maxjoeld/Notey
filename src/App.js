import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import NoteList from './components/Notes/NoteList';
import CreateNote from './components/Notes/CreateNote';
import ViewNote from './components/Notes/ViewNote';
import EditNote from './components/Notes/EditNote';

import Login from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';

import RequireAuth from './hoc/RequireAuth';
import Convo from './components/Chat/Conversation';


import { isAuthenticated } from './actions';

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
      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={(SignUp)} />
          <PrivateRoute exact path="/" component={RequireAuth(NoteList)} />
          <PrivateRoute path="/create" component={RequireAuth(CreateNote)} />
          <PrivateRoute path="/view" component={RequireAuth(ViewNote)} />
          <PrivateRoute path="/edit" component={RequireAuth(EditNote)} />
          <PrivateRoute path="/convo" component={RequireAuth(Convo)} />
        </Switch>
      </div>
    </Router>
  );
}


const mapStateToProps = state => {
  return {
    isAuth: state.isAuthenticated,
  };
};

export default connect(mapStateToProps, { isAuthenticated })(App);
