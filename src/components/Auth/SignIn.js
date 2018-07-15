import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { loginUser, loginGoogle } from '../../actions';
import logo from './google.png';
import noteyLogo from './logo.png';
import backgroundImage from './background.jpg';


class SignIn extends Component {
  state = {
    username: '',
    password: '',
  };

  loginUser = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.loginUser(username, password, this.props.history);
  };

  loginGoogle = e => {
    e.preventDefault();
    this.props.loginGoogle();
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className=".App-sign">
        <div className="signin">
          <img src={backgroundImage} alt="bg" className="signin--image" />
          <div className="signin--box">
            <img src={noteyLogo} alt="SideLogo" className="Side-logo" />
            <h1 className="signin-notey">Notey</h1>
            <h1 className="signin--header">Sign In</h1>
            <div className="signin--buttons">
              <button className="signin--buttons__facebook">
                <i className="fab fa-facebook-square" />facebook
              </button>
              <a href="/auth/google" className="signin--buttons__google">
                {/* <button className="signin--buttons__google" onClick={e => this.loginGoogle(e)}> */}
                <img src={logo} alt="google logo" className="signin--buttons__google--logo" />Google
                {/* </button> */}
              </a>
            </div>
            {this.state.requestError ? <h5>Invalid Email or Password</h5> : null}
            <form className="signin--signin">
              Username:<br />
              <input
                name="username"
                className="signin--signin__username"
                placeholder="Username"
                onChange={this.handleInputChange}
              />
              <br />
              Password
              <br />
              <input
                name="password"
                className="signin--signin__password"
                placeholder="Password"
                onChange={this.handleInputChange}
              />
              <br />
              <input
                className="signin--signin__button"
                type="submit"
                value="Sign In"
                onClick={e => this.loginUser(e)}
              />
            </form>
            <p className="signin--notmember">
              Not a member? <Link to="/signup"> Sign up </Link>
              <Link to="/Home">Home</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     login: state.login,
//   };
// };

export default withRouter(connect(null, { loginUser, loginGoogle })(SignIn));
