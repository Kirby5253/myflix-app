import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

/**
 * allows users to type in the id of their favorite movie to remove it from their account list
 * @function LoginView
 * @requires react
 * @requires react-bootstrap/Form
 * @requires './change-favorites-view.scss'
 * @requires axios
 * @requires react-router-dom
 * @requires react-redux
 */
function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const storedUser = localStorage.getItem('user');

  /**
	 * handles the post to db to login user to app
	 * @function handleSubmit
	 * @param {*} e
	 */
  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios
      .post('https://myflixdb5253.herokuapp.com/login', {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log('no such user');
      });
  };

  /**
	 * allows user to push enter instead of clicking login
	 * @function handleSubmitEnter
	 */
  const handleSubmitEnter = () => {
    if (event.key === 'Enter') {
      /* Send a request to the server for authentication */
      axios
        .post('https://myflixdb5253.herokuapp.com/login', {
          Username: username,
          Password: password,
        })
        .then((response) => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch((e) => {
          console.log('no such user');
        });
    }
  };

  // auto login for returning users
  if (storedUser) return null;

  return (
    <div className="login-form">
      <Form className>
        <Form.Label>
          <h3 className="login-title">Login to MyFlix</h3>
        </Form.Label>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onKeyPress={handleSubmitEnter}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br />
        <Button variant="dark" className="login-button" type="button" onClick={handleSubmit}>
          Login
        </Button>
        <Link to={`/register`}>
          <Button variant="link" className="login-button" type="button">
            New to MyFlix? Click here to create an account
          </Button>
        </Link>
        <br />
      </Form>
    </div>
  );
}

LoginView.propTypes = {
  setUsername: PropTypes.string,
  setPassword: PropTypes.string,
};

export default connect(null, {})(LoginView);
