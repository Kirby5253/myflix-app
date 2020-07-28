import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './delete-profile-view.scss';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * allows users to type in the details that they want to change of their account
 * @function DeleteProfile
 * @requires react
 * @requires prop-types
 * @requires react-bootstrap/Button
 * @requires './delete-profile-view.scss'
 * @requires axios
 * @requires react-router-dom
 * @requires react-redux
 */
function DeleteProfile(props) {
  const { user, onDelete } = this.props;
  const token = localStorage.getItem('token');

  /**
	 * handles the delete request to api
	 * @params {string} username
	 */
  const handleDelete = (e) => {
    axios
      .delete(`https://myflixdb5253.herokuapp.com/users/${user.Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const data = response.data;
        location.reload();
        console.log(data);
        onDelete();
      })
      .catch((e) => {
        console.log('no such user');
      });
  };

  return (
    <div className="delete-profile">
      <h1>Are you sure you want to delete this profile?</h1>
      <ul>
        <li>
          <Link to={`/register`}>
            <Button onClick={handleDelete} className="delete-buttons" variant="danger">
              Yes, delete my account.
            </Button>
          </Link>
        </li>
        <li>
          <Link to={`/profile/${user.Username}`}>
            <Button className="delete-buttons">No, do not delete my account.</Button>
          </Link>
        </li>
      </ul>
    </div>
  );
}

DeleteProfile.propTypes = {
  user: PropTypes.object,
};

let mapStateToProps = (state) => {
  return { user: state.userInfo };
};

export default connect(mapStateToProps, {})(DeleteProfile);
