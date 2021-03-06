import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import MovieCard from '../movie-card/movie-card';

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

/**
 * container for the movie cards and handles the filtering function
 * @function MoviesList
 * @param {*} props
 * @requires react
 * @requires react-redux
 * @requires react-bootstrap
 * @requires prop-types
 */
function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(
      (m) =>
        m.Title.toLowerCase().includes(visibilityFilter) ||
        m.Description.toLowerCase().includes(visibilityFilter),
    );
  }

  if (!movies) return <div className="main-view" />;

  return (
    <Container className="movies-list">
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      <div className="movies-list grid">
        {filteredMovies.map((m) => <MovieCard key={m._id} movie={m} />)}{' '}
      </div>
    </Container>
  );
}

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  visibilityFilter: PropTypes.string,
};

export default connect(mapStateToProps)(MoviesList);
