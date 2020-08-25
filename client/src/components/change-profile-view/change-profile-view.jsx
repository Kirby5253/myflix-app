import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './change-profile-view.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

/**
 * allows users to type in the details that they want to change of their account
 * @function ChangeProfile
 * @requires react
 * @requires react-bootstrap/Form
 * @requires react-bootstrap/Button
 * @requires './change-profile-view.scss'
 * @requires axios
 * @requires react-router-dom
 * @requires react-redux
 */
function ChangeProfile(props) {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newBirthDate, setNewBirthDate] = useState('');
  const storedUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if (!storedUser) return null;

  /**
	 * handles the put request to api to change user details
	 * @function handleProfileUpdate
	 * @params {string} new username
	 * @params {string} new password
	 * @params {string} new email
	 * @params {string} new birthday
	 */
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios
      .put(
        `https://myflixdb5253.herokuapp.com/users/${storedUser}`,
        {
          Username: newUsername,
          Password: newPassword,
          Email: newEmail,
          Birthday: newBirthDate,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then((response) => {
        const data = response.data;
        console.log(data);
        alert('User info was successfully updated!');
        window.open(`/client/profile/${newUsername}`, '_self'); // Self to open in the current window
        localStorage.setItem('user', newUsername);
      })
      .catch((e) => {
        alert('Error: User info was not updated. Please try again.');
        console.log('error updating the user');
        console.log(e);
      });
  };

  return (
    <div className="update-form">
      <Form className="change-form">
        <Form.Label>
          <h3>
            Update User Info<br />
          </h3>
        </Form.Label>

        <Form.Group controlId="formBasicUsername">
          <Form.Label>New Username:</Form.Label>
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
            Please include a username with at least 5 characters.
          </div>
        ) : null}

        <Form.Group controlId="formBasicPassword">
          <Form.Label>New Password:</Form.Label>
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
            Please include a password with at least 4 characters.
          </div>
        ) : null}

        <Form.Group controlId="formBasicEmail">
          <Form.Label>New Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
        </Form.Group>
        {newEmail.length > 5 && newEmail.includes('@') ? null : (
          <div className="form-validation">Please include a valid email.</div>
        )}

        <Form.Group controlId="formBasicBirthday">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            placeholder="YYYY-MM-DD"
            value={newBirthDate}
            onChange={(e) => setNewBirthDate(e.target.value)}
            required
          />
        </Form.Group>
        {newBirthDate.length >= 8 ? null : (
          <div className="form-validation">Birthday is required...</div>
        )}

        {newUsername.length >= 5 &&
        newPassword.length >= 4 &&
        newEmail.includes('@') &&
        newBirthDate.length >= 8 ? (
          <Button
            className="register-button"
            onClick={handleProfileUpdate}
            variant="primary"
            type="button"
          >
            Update Account
          </Button>
        ) : (
          <Button variant="primary" type="button" className="disabled register-button">
            Update Account
          </Button>
        )}
        <Link to={`/profile/${storedUser}`}>
          <Button variant="link">Cancel Update</Button>
        </Link>
      </Form>
    </div>
  );
}

export default connect(null, {})(ChangeProfile);
