import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import logo from '../google.png';
import './SignIn.css';
axios.defaults.withCredentials = true;

class SignIn extends Component {
  state = {
    username: '',
    password: '',
    requestError: false,
  };

  loginUser = e => {
    e.preventDefault();
    const { username, password } = this.state;
    axios
      .post('http://localhost:5000/notes/login', { username, password })
      .then(res => {
        sessionStorage.setItem('id', res.data);
        console.log(res.data);
      })
      .then(() => {
        this.props.isAuth();
      })
      .then(() => this.props.getNotes())
      .then(() => this.props.history.push('/'))
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
          {this.state.requestError ? <h5>Wrong Email or Password</h5> : null}
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
                onClick={(e) => this.loginUser(e)}
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

export default withRouter(SignIn);
