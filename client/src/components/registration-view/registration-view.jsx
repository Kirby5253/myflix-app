import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { connect } from 'react-redux';

/**
 * allows users to type in the id of their favorite movie to remove it from their account list
 * @function RegistrationView
 * @requires react
 * @requires react-bootstrap/Form
 * @requires react-bootstrap/Button
 * @requires axios
 * @requires react-redux
 */
function RegistrationView(props) {
  const user = localStorage.getItem('user');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newBirthDate, setNewBirthDate] = useState('');

  if (user) return null;

  /**
	 * handles registering the user with a post request to the api
	 * @param {string} Username Username needs a minimum of 5 alphanumeric characters
	 * @param {string} Password Password needs at least 4 alphanumeric characters
	 * @param {string} Email Email needs @ and .
	 * @param {date} Birthday MM/DD/YYYY
	 */
  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios
      .post('https://myflixdb5253.herokuapp.com/users', {
        Username: newUsername,
        Password: newPassword,
        Email: newEmail,
        Birthday: newBirthDate,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        window.open('/client', '_self'); // Self to open in the current window
        if (data) {
          alert(
            'User ' +
              newUsername +
              ' was successfully created. Please login with your new username and password.',
          );
        }
      })
      .catch((e) => {
        console.log('error registering the user', e);
        alert(
          'User ' +
            newUsername +
            ' is already taken or one of the fields does not meet our membership criteria. Please try to create a new username and verify the information in each field for accuracy.',
        );
      });
  };

  const cancelRegistration = () => {
    window.open('/client', '_self');
  };

  return (
    <div className="login-form">
      <Form className="register-form">
        <Form.Label>
          <h3 className="login-title">Create New User</h3>
        </Form.Label>

        <Form.Group controlId="formBasicUsername">
          <Form.Label>Create Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            required
          />
        </Form.Group>
        {newUsername.length < 5 ? (
          <div className="form-validation">
            Please create a username with at least 5 characters...
          </div>
        ) : (
          <div className="form-validation__good">Username meets all criteria!</div>
        )}
        {!newUsername && newPassword ? (
          <div className="form-validation">
            Please create a username...(Make sure to only use letters or numbers.)
          </div>
        ) : null}

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Create Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </Form.Group>
        {newPassword.length < 4 ? (
          <div className="form-validation">
            Password is required and must contain at least 4 characters...
          </div>
        ) : (
          <div className="form-validation__good">Password meets all criteria!</div>
        )}

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </Form.Group>
        {newEmail.includes('@') ? (
          <div className="form-validation__good">Email meets all criteria!</div>
        ) : (
          <div className="form-validation">Email is required...</div>
        )}

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            placeholder="YYYY-MM-DD"
            value={newBirthDate}
            onChange={(e) => setNewBirthDate(e.target.value)}
          />
        </Form.Group>
        {newBirthDate.length >= 8 ? (
          <div className="form-validation__good">Birthday meets all criteria!</div>
        ) : (
          <div className="form-validation">Birthday is required...</div>
        )}

        {newUsername.length >= 5 &&
        newPassword.length >= 4 &&
        newEmail.includes('@') &&
        newBirthDate.length >= 8 ? (
          <Button
            className="register-button"
            variant="primary"
            type="button"
            onClick={handleRegistrationSubmit}
          >
            Register
          </Button>
        ) : (
          <Button className="register-button disabled" variant="dark" type="button">
            Register
          </Button>
        )}
        <Button className="login-button" variant="link" type="button" onClick={cancelRegistration}>
          Already a user? Click here to sign in.
        </Button>
      </Form>
    </div>
  );
}

export default connect(null, {})(RegistrationView);
