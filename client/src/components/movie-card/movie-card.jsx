import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import './movie-card.scss';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

class MovieCard extends React.Component {
	render() {
		const { movie } = this.props;

		const truncateString = (str, num) => {
			if (str.length <= 100) {
				return str;
			}
			return str.slice(0, 110) + '...';
		};

		return (
			<div className="movie-cards">
				<Card text={'white'} className="movie-cards__item" bg={'dark'}>
					<div className="card-overlay">
						<Card.Img className="movie-card-img" variant="top" src={movie.ImagePath} />
					</div>
					<Card.Body>
						<Card.Title className="movie-title__card">{movie.Title}</Card.Title>
						<Card.Text>{truncateString(movie.Description)}</Card.Text>
						<Link to={`/movies/${movie._id}`}>
							<Button className="more-details">More Details</Button>
						</Link>
					</Card.Body>
				</Card>
			</div>
		);
	}
}

MovieCard.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		Description: PropTypes.string.isRequired,
		ImagePath: PropTypes.string.isRequired
	}).isRequired
};

export default connect(null, {})(MovieCard);