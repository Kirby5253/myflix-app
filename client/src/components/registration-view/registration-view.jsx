import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';

function RegistrationView(props) {
	const user = localStorage.getItem('user');
	const [ newUsername, setNewUsername ] = useState('');
	const [ newPassword, setNewPassword ] = useState('');
	const [ newEmail, setNewEmail ] = useState('');
	const [ newBirthDate, setNewBirthDate ] = useState('');

	if (user) return null;

	const handleRegistrationSubmit = (e) => {
		e.preventDefault();
		/* Send a request to the server for authentication */
		axios
			.post('https://myflixdb5253.herokuapp.com/users', {
				Username: newUsername,
				Password: newPassword,
				Email: newEmail,
				Birthday: newBirthDate
			})
			.then((response) => {
				const data = response.data;
				console.log(data);
				window.open('/client', '_self'); // Self to open in the current window
				alert(
					'User ' +
						newUsername +
						' was successfully created. Please login with your new username and password.'
				);
			})
			.catch((e) => {
				console.log('error registering the user', e);
				alert(
					'User ' +
						newUsername +
						' is already taken or does not meet our username criteria. Please try a new username.'
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
				{newUsername.length < 5 ? <div className="form-validation">Please create a username with at least 5 characters...</div>: <div className="form-validation__good">Username meets all criteria!</div>}
				{!newUsername && newPassword ?<div className="form-validation">Please create a username...(Make sure to only use letters or numbers.)</div>: null}

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
				{!newPassword ?<div className="form-validation">Password is required...</div>: null}

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						placeholder="Email"
						value={newEmail}
						onChange={(e) => setNewEmail(e.target.value)}
						
					/>
				</Form.Group>
				{newEmail.includes('@') ? <div className="form-validation__good">Email meets all criteria!</div>: <div className="form-validation">Email is required...</div>}

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Date of Birth</Form.Label>
					<Form.Control
						type="text"
						placeholder="YYYY-MM-DD"
						value={newBirthDate}
						onChange={(e) => setNewBirthDate(e.target.value)}
					/>
				</Form.Group>
				{newBirthDate.length >= 8 ? <div className="form-validation__good">Birthday meets all criteria!</div>: <div className="form-validation">Birthday is required...</div>}

				<Button className="login-button" variant="dark" type="button" onClick={handleRegistrationSubmit}>
					Register
				</Button>
				<Button className="login-button" variant="link" type="button" onClick={cancelRegistration}>
					Already a user? Click here to sign in.
				</Button>
			</Form>
		</div>
	);
}

RegistrationView.propTypes = {
	setNewUsername: PropTypes.string,
	setNewPassword: PropTypes.string
};

export default connect(null, {})(RegistrationView);