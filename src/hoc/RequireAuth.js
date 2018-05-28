import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setId, isAuthenticated } from '../../store/actions';

export default ComposedComponent => {
  class RequireAuth extends Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
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

  return connect(null, { setId, isAuthenticated })(RequireAuth);
};
