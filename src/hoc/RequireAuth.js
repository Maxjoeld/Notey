import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setId, isAuthenticated } from '../actions';

export default ComposedComponent => {
  class RequireAuth extends Component {
    componentWillMount() {
      this.props.isAuthenticated();
      console.log(this.props.isAuth);
      if (!this.props.isAuth) {
        this.props.history.push('/login');
      }
    }

    // componentWillUpdate(nextProps) {
    //   if (!this.props.isAuth) {
    //     this.props.history.push('/login');
    //   }
    // }

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

  return connect(mapStateToProps, { setId, isAuthenticated })(RequireAuth);
};
