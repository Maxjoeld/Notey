import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import logo from './google.png';
import './SignIn.css';

class SignIn extends Component {
  state = {
    username: '',
    password: '',
    requestError: false,
    redirectToReferrer: false,
  };

  componentDidMount() {
    // if (this.state.redirectToReferrer) {
    //   return this.props.history.push('/');
    // }
  }

  login = () => {
    this.props.isAuth(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }));
    });
  };

  loginUser = e => {
    e.preventDefault();
    const { username, password } = this.state;
    axios
      .post('http://localhost:5000/notes/login', { username, password })
      .then(re => {
        this.login();
        console.log(re);
      })
      .catch(err => {
        console.log(err);
        this.setState({ requestError: true });
        setTimeout(() => {
          this.setState({ requestError: false });
        }, 3000);
      });
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    // console.log(this.props)
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      return <Redirect to="/" />;
    }

    return (
      <div className="signin">
        <div className="signin--box">
          <h1 className="signin--header">Sign In</h1>
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
            <Link to="/">
              <input
                className="signin--signin__button"
                type="submit"
                value="Sign In"
                onClick={this.loginUser}
              />
            </Link>
          </form>
          <p className="signin--notmember">
            Not a member? <Link to="/signup"> Sign up </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default SignIn;
