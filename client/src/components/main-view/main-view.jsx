import React from 'react';
import axios from 'axios';
import './main-view.scss';
import { Nav, Navbar, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { setMovies, setUserInfo } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import LoginView from '../login-view/login-view';
import MovieView from '../movie-view/movie-view';
import RegistrationView from '../registration-view/registration-view';
import GenreView from '../genre-view/genre-view';
import DirectorView from '../director-view/director-view';
import ProfileView from '../profile-view/profile-view';
import ChangeProfile from '../change-profile-view/change-profile-view';
import DeleteProfile from '../delete-profile-view/delete-profile-view';
import ChangeFavorites from '../change-favorites-view/change-favorites-view';

class MainView extends React.Component {
	constructor() {
		super();

		this.state = {
			user: null
		};
	}

	// One of the "hooks" available in a React Component
	// Takes the token and allows users to stay logged in
	componentDidMount() {
		let accessToken = localStorage.getItem('token');
		let storedUser = localStorage.getItem('user');
		if (accessToken !== null) {
			this.setState({
				user: localStorage.getItem('user')
			});
			this.getMovies(accessToken);
			this.getUserInfo(storedUser, accessToken);
		}
	}

	onLoggedIn(authData) {
		console.log(authData);
		this.setState({
			user: authData.user.Username
		});

		localStorage.setItem('token', authData.token);
		localStorage.setItem('user', authData.user.Username);
		this.getMovies(authData.token);
		this.getUserInfo( authData.user.Username,authData.token);	
	}

	getMovies(token) {
		axios
			.get('https://myflixdb5253.herokuapp.com/movies', {
				headers: { Authorization: `Bearer ${token}` }
			})
			.then((response) => {
				// Assign the result to the state
				this.props.setMovies(response.data);
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	getUserInfo(user, token) {
		axios
			.get(`https://myflixdb5253.herokuapp.com/users/${user}`, {
				headers: { Authorization: `Bearer ${token}` }
			})
			.then((response) => {
				this.props.setUserInfo(response.data);
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	favoriteList(user) {
		return user.Favorite_Movies.join(',  ')
	}

	logoutUser(user) {
		this.props.setUserInfo(null);
		localStorage.removeItem('token');
		localStorage.removeItem('user');
	}

	render() {
		let { movies, userInfo } = this.props;
		// If the state isn't initialized, this will throw on runtime
		// before the data is initially loaded
		const { user } = this.state;
		const storedUser = localStorage.getItem('user');

		return (
			<div>
				{//Allows the nav bar to not render links until user logs in
				userInfo ? (
					<div className="navbar">
						<Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
							<Navbar.Brand href="/client/">
								<h1>MyFlix</h1>
							</Navbar.Brand>
							<Navbar.Toggle aria-controls="responsive-navbar-nav" />
							<Navbar.Collapse id="responsive-navbar-nav">
								<Nav className="mr-auto">
									<Nav.Link href="/client/">Movies</Nav.Link>
									<Nav.Link href={`/client/profile/${user}`}>Account</Nav.Link>
									<Nav.Link onClick={(user) => this.logoutUser()} href="/client">
										Logout
									</Nav.Link>
								</Nav>
							</Navbar.Collapse>
						</Navbar>
					</div>
				) : (
					<div className="navbar">
						<Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
							<Navbar.Brand href="/">
								<h1>MyFlix</h1>
							</Navbar.Brand>
						</Navbar>
					</div>
				)}

				{/* Login or main page depending on if the user is logged in */}
				<Router basename="/client">
					<div className="main-view">
						<Route
							exact
							path="/"
							render={() => {
								if (!userInfo)
								return (
										<Container>
											<LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
										</Container>
									);
									return <MoviesList movies={movies} />;
							}}
						/>

						{/* Create new user  */}
						<Route
							path="/register"
							render={() => {
								if (!user)
									return (
										<Container>
											<RegistrationView />
										</Container>
									);
							}}
						/>

						{/* See user profile */}
						<Route
							path="/profile/:username"
							render={({ match }) => {
								// Users can only see their own account info!
								if (match.params.username === storedUser)
									return (
										<ProfileView user={userInfo} favList={this.favoriteList}/>
									);
							}}
						/>

						{/* Allow users to update their profile info */}
						<Route
							path="/profile/:username/update"
							render={({ match }) => {
								// Users can only see their own account info!
								if (match.params.username === storedUser)
									return (
										<ChangeProfile user={userInfo} />
									);
							}}
						/>

						{/* Allow users to delete their profile */}
						<Route
							path="/profile/:username/delete"
							render={({ match }) => {
								// Users can only see their own account info!
								if (match.params.username === storedUser)
									return (
										<DeleteProfile user={userInfo} onDelete={(user) => this.logoutUser()}/>
									);
							}}
						/>

						{/* Allow users to remove favorites form their list */}
						<Route
							path="/profile/:username/favorites"
							render={({ match }) => {
								// Users can only see their own account info!
								if (match.params.username === storedUser)
									return (
										<ChangeFavorites user={userInfo}/>
									);
							}}
						/>

						{/* Allow users to see details about a movie, and add it to their favorites */}
						<Route
							path="/movies/:movieId"
							render={({ match }) => (
								<MovieView
									addToFav={() => this.addToFav(user)}
									movie={movies.find((m) => m._id === match.params.movieId)}
									user={userInfo}
									token={localStorage.getItem('token')}
								/>
							)}
						/>

						{/* Allow users to see more details about a movie's genre */}
						<Route
							path="/genres/:name"
							render={({ match }) => {
								if (!movies) return <div className="main-view" />;
								return (
									<GenreView genre={movies.find((m) => m.Genre.Name === match.params.name).Genre} />
								);
							}}
						/>

						{/* Allow users to see more details about a movie's director */}
						<Route
							path="/directors/:name"
							render={({ match }) => {
								if (!movies) return <div className="main-view" />;
								return (
									<DirectorView
										director={movies.find((m) => m.Director.Name === match.params.name).Director}
									/>
								);
							}}
						/>
					</div>
				</Router>
			</div>
		);
	}
}

MainView.propTypes = {
	movies: PropTypes.array.isRequired,

};

let mapStateToProps = (state) => {
	return { movies: state.movies, userInfo: state.userInfo };
};

export default connect(mapStateToProps, { setMovies, setUserInfo })(MainView);
