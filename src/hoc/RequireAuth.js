import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setId, isAuthenticated } from '../actions';

export default ComposedComponent => {
  class RequireAuth extends Component {
    async componentWillMount() {
      await this.props.isAuthenticated();
      if (!this.props.isAuth) {
        this.props.history.push('/login');
      }
    }

    render() {
      return (
        <div>
          <ComposedComponent {...this.props} />
        </div>
      );
    }
  }
  const mapStateToProps = state => {
    return {
      isAuth: state.isAuthenticated,
    };
  };

  return  withRouter(connect(null, { setId, isAuthenticated })(RequireAuth));
};
