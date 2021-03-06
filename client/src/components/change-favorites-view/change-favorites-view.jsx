import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './change-favorites-view.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

/**
 * allows users to type in the id of their favorite movie to remove it from their account list
 * @function ChangeFavorites
 * @requires react
 * @requires react-bootstrap/Form
 * @requires './change-favorites-view.scss'
 * @requires axios
 * @requires react-router-dom
 * @requires react-redux
 */
function ChangeFavorites() {
  const [favoriteId, confirmFavoriteId] = useState('');
  const storedUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  /**
	 * function that handles the put request to edit the user's favorite array
	 * @function handleRemoveFavorite
	 */
  const handleRemoveFavorite = () => {
    axios
      .put(
        `https://myflixdb5253.herokuapp.com/users/${storedUser}/Movies/${favoriteId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then((response) => {
        const data = response.data;
        console.log(data);
        alert(favoriteId + ' has been removed from favorites.');
        location.reload();
      })
      .catch((e) => {
        console.log(e);
        alert('Please input a valid Movie ID.');
      });
  };

  return (
    <div className="remove-favorite">
      <h1 />
      <Form className="delete-fav">
        <Form.Group controlId="formRemoveFav">
          <Form.Label>Input the ID of the movies you wish to remove from favorites</Form.Label>
          <Form.Control
            type="text"
            placeholder="Movie ID"
            value={favoriteId}
            onChange={(e) => confirmFavoriteId(e.target.value)}
            required
          />
        </Form.Group>
        <Button onClick={handleRemoveFavorite} variant="primary" type="button">
          Update Favorites
        </Button>
        <Link to={`/profile/${storedUser}`}>
          <Button variant="link">Cancel Update</Button>
        </Link>
      </Form>
    </div>
  );
}

let mapStateToProps = (state) => {
  return { user: state.userInfo };
};

export default connect(mapStateToProps, {})(ChangeFavorites);
