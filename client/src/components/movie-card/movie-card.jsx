import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import './movie-card.scss';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

/**
 * displays the movie information in card form
 * @class MovieCard
 * @requires react
 * @requires prop-types
 * @requires react-bootstrap
 * @requires './movie-card.scss'
 * @requires react-router-dom
 * @requires react-redux
 */
class MovieCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isHovered: false,
    };
    this.handleHover = this.handleHover.bind(this);
  }

  handleHover() {
    this.setState((prevState) => ({
      isHovered: !prevState.isHovered,
    }));
    console.log(this.state.isHovered);
  }

  render() {
    const { movie } = this.props;

    // // cuts off long movie descriptions
    // const truncateString = (str, num) => {
    //   if (str.length <= 100) {
    //     return str;
    //   }
    //   return str;
    // };

    return (
      <div className="movie-cards">
        <Card
          text={'white'}
          className="movie-cards__item"
          bg={'dark'}
          onMouseEnter={this.handleHover}
          onMouseLeave={this.handleHover}
        >
          <div className="card-overlay">
            <Card.Img className="movie-card-img" variant="top" src={movie.ImagePath} />
          </div>
          {this.state.isHovered ? (
            <Card.Body className="card-body card-body__reveal">
              <Card.Title className="movie-title__card">{movie.Title}</Card.Title>
              <Card.Text>{movie.Description}</Card.Text>
              <Link to={`/movies/${movie._id}`}>
                <Button className="more-details">More Details</Button>
              </Link>
            </Card.Body>
          ) : null}
        </Card>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(null, {})(MovieCard);
