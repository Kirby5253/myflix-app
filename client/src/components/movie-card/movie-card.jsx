import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import './movie-card.scss';

import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
	render() {
		const { movie } = this.props;

		const truncateString = (str, num) => {
			if (str.length <= 70) {
				return str;
			}
			return str.slice(0, 70) + '...';
		};

		return (
			<div className="movie-cards">
				<Card text={'white'} style={{ width: '15rem', height: '38rem' }} bg={'dark'}>
					<div className="card-overlay">
						<Card.Img className="movie-card-img" variant="top" src={movie.ImagePath} />
					</div>
					<Card.Body>
						<Card.Title className="movie-title">{movie.Title}</Card.Title>
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
