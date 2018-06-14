import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setId, isAuthenticated } from '../actions';

export default ComposedComponent => {
  class RequireAuth extends Component {
    componentWillMount() {
      this.props.isAuthenticated();
      // console.log(this.props.isAuth);
      if (!sessionStorage.getItem('id')) {
        this.props.history.push('/login');
      }
    }


    render() {
      return (
        <div>
          {sessionStorage.getItem('id') && (
          <ComposedComponent {...this.props} />
          )}
        </div>
      );
    }
  }
  const mapStateToProps = state => {
    return {
      isAuth: state.isAuthenticated,
    };
  };

  return withRouter(connect(mapStateToProps, { setId, isAuthenticated })(RequireAuth));
};
