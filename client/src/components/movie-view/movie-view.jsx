import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './movie-view.scss';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * @class MovieView
 * @requires react
 * @requires react-bootstrap
 * @requires prop-types
 * @requires axios
 * @requires react-redux
 * @requires react-router-dom
 * @requires './movie-view.scss'
 */
class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  /**
	 * allows user to add a selected movie to their favorites
	 * @function handleAddFavorite
	 */
  handleAddFavorite = () => {
    const { movie, user, token } = this.props;
    const storedUser = localStorage.getItem('user');
    axios
      .post(
        `https://myflixdb5253.herokuapp.com/users/${storedUser}/Movies/${movie._id}`,
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
        alert(movie.Title + ' has been added to favorites!');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view">
        <img className="movie-poster" src={movie.ImagePath} />
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="movie-title">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-actors">
          <span className="label">Leading Cast: </span>
          <span className="value">{movie.Actors.join(',  ')}</span>
        </div>
        <div className="movie-genre">
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link" className="label link">
              Genre:{' '}
            </Button>
          </Link>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="movie-director">
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link" className="label link">
              Director:{' '}
            </Button>
          </Link>
          <span className="value">{movie.Director.Name}</span>
        </div>

        <br />
        <Button className="movie-button" onClick={this.handleAddFavorite} variant="dark">
          Add to Favorites
        </Button>
        <br />

        <Link to={`/`}>
          <Button className="movie-button" variant="dark">
            Back
          </Button>
        </Link>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.object,
    Genre: PropTypes.object,
    Actors: PropTypes.array,
  }),
};

export default connect(null, {})(MovieView);
