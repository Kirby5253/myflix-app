import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './genre-view.scss';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

/**
 * allows users to see the details that they want to view about movie genres.
 * only accessible from movie view currently
 * @class GenreView
 * @requires react
 * @requires axios
 * @requires react-bootstrap/Button
 * @requires './director-view.scss'
 * @requires react-router-dom
 * @requires react-redux
 */
class GenreView extends React.Component {
  constructor() {
    super();

    this.state = { genreInfo: '' };
  }

  /**
	 * handles getting the info for the related genre
	 * @param {string} name genre name
	 * @returns {object} Genre name and description
	 */
  getGenreInfo(name) {
    const token = localStorage.getItem('token');
    axios
      .get(`https://myflixdb5253.herokuapp.com/genres/${name}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({ genreInfo: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getGenreInfo(this.props.name);
  }
  render() {
    const { genreInfo } = this.state;

    return (
      <div className="genre-view">
        <div className="genre-name">
          <span className="label">Genre Name: </span>
          <span className="value">{genreInfo.Name}</span>
        </div>{' '}
        <br />
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{genreInfo.Description}</span>
        </div>
        <br />
        <Link to={`/`}>
          <Button className="genre-button" variant="link">
            Home
          </Button>
        </Link>
      </div>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }),
};

export default connect(null, {})(GenreView);
