import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveUser } from '../../actions';

import logo from './google.png';
import backgroundImage from './background2.jpg';
import noteyLogo from './logo.png';
const styles = {
  backgroundImage: `url(${backgroundImage})`,
};

class SignUp extends Component {
  state = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
  };

  saveUser = e => {
    e.preventDefault();
    const { username, password, firstName, lastName } = this.state;
    this.props.saveUser(username, password, firstName, lastName, this.props.history);
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="signup" style={styles}>
        <p className="signup-headline">Lorem ipsum <br/> <span className="signup-headline2">dolor sit amet</span></p>
        <div className="signup--box">
        <img src={noteyLogo} alt="SideLogo" className="Side-logo" />
        <h1 className="signin-notey">Notey</h1>
          <h1 className="signin--header">Sign Up With</h1>
          <h3>{this.props.message}</h3>
          <form className="signin--signin">
            <input
              name="username"
              onChange={this.handleInputChange}
              className="signin--signin__username"
              placeholder="Username"
            />
            <br />
            <input
              name="password"
              onChange={this.handleInputChange}
              className="signin--signin__password"
              placeholder="Password"
            />
            <br />
            <input
              name="firstName"
              onChange={this.handleInputChange}
              className="signin--signin__username"
              placeholder="firstname"
            />
            <br />
            <input
              name="lastName"
              onChange={this.handleInputChange}
              className="signin--signin__username"
              placeholder="lastName"
            />
            <br />
            <input
              className="signin--signin__button"
              type="submit"
              value="Sign Up"
              onClick={e => this.saveUser(e)}
            />
          </form>
          <p className="signin--orsign"> Or sign up with </p>
          <div className="signin--buttons">
            <button className="signin--buttons__facebook">
              <i className="fab fa-facebook-square" />facebook
            </button>
            <button className="signin--buttons__google">
              <img
                src={logo}
                alt="google logo"
                className="signin--buttons__google--logo"
              />Google
            </button>
          </div>
          <p className="signin--notmember">
            {' '}
            Already a member? <Link to="/"> Sign in </Link>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    message: state.error,
  };
};

export default withRouter(connect(mapStateToProps, { saveUser })(SignUp));
