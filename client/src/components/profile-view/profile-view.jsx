import React from 'react';
import { Button, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './profile-view.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ProfileView extends React.Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		const { user, favList } = this.props;
		const storedUser = localStorage.getItem('user');

		let favorites = user.Favorite_Movies;

		console.log(favorites);

		if(!storedUser) return null;

		return (
			<Container>
				<div className="profile-view">
					<div className="username">
						<span className="profile-label">Username: </span>
						<span className="value">{user.Username}</span>
					</div>
					<div className="user-email">
						<span className="profile-label">Email: </span>
						<span className="value">{user.Email}</span>
					</div>
					<div className="user-favorites">
						<span className="profile-label">Favorites: </span>
						<span className="value">{favorites}</span>
					</div>
					<div className="button-nav">
						<ul>
							<li>
								<Link to={`/profile/${user.Username}/favorites`}>
									<Button variant="dark">Remove Favorites</Button>
								</Link>
							</li>
							<li>
								<Link to={`/profile/${user.Username}/update`}>
									<Button variant="dark">Update Account</Button>
								</Link>
							</li>
							<li>
								<Link to={`/profile/${user.Username}/delete`}>
									<Button variant="dark">Delete Account</Button>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</Container>
		);
	}
}
let mapStateToProps = (state) => {
	return { user: state.userInfo };
};

export default connect(mapStateToProps, {})(ProfileView);