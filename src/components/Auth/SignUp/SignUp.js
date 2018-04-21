import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';
import logo from '../google.png';

class SignUp extends Component {
  state = {
    username: '',
    password: '',
    requestError: false,
  };

  saveUser = e => {
    e.preventDefault();
    const { username, password } = this.state;
    axios
      .post('http://localhost:5000/notes/register', this.state)
      .then(() => {
        return axios.post('http://localhost:5000/notes/login', { username, password });
      })
      .then(() => {
        this.props.isAuth();
      })
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
          <h1 className="signin--header">Sign Up With</h1>
          <form className="signin--signin">
            Username:<br />
            <input
              name="username"
              onChange={this.handleInputChange}
              className="signin--signin__username"
              placeholder="Username"
            />
            <br />
            Password
            <br />
            <input
              name="password"
              onChange={this.handleInputChange}
              className="signin--signin__password"
              placeholder="Password"
            />
            <br />
            <input
              className="signin--signin__button"
              type="submit"
              value="Sign Up"
              onClick={(e) => this.saveUser(e)}
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
            Already a member? <Link to="/signin"> Sign in </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);
