import React from 'react';
import { Button, Container } from 'react-bootstrap';
import './profile-view.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * displays the users profile name, info, and options to update/change/delete profile
 * @class MoviesList
 * @requires react
 * @requires react-redux
 * @requires react-bootstrap
 * @requires react-router-dom
 * @requires './profile-view.scss'
 */
class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      favList: [],
    };
  }

  render() {
    const { favList } = this.state;
    const { user, userFavorites } = this.props;
    const storedUser = localStorage.getItem('user');

    if (!storedUser) return null;

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
            <span className="value">{userFavorites.join(',  ')}</span>
          </div>
          <div className="button-nav">
            <ul>
              {/* <li>
                <Link to={`/profile/${user.Username}/favorites`}>
                  <Button variant="dark">Remove Favorites</Button>
                </Link>
              </li> */}
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
  return {
    user: state.userInfo,
    userFavorites: state.userFavorites,
  };
};

export default connect(mapStateToProps, {})(ProfileView);
