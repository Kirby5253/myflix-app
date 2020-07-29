import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './director-view.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

/**
 * allows users to view the details of a director that they want to view.
 * only accessible through movie view currently
 * @class DirectorView
 * @requires react
 * @requires axios
 * @requires react-bootstrap/Button
 * @requires './director-view.scss'
 * @requires react-router-dom
 * @requires react-redux
 */
class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = { directorInfo: '' };
  }

  /**
	 * handles getting the info for the related director
	 * @param {string} name director name
	 * @returns {object} Director name, biography, and birth year
	 */
  getDirectorInfo(name) {
    const token = localStorage.getItem('token');
    axios
      .get(`https://myflixdb5253.herokuapp.com/directors/${name}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({ directorInfo: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getDirectorInfo(this.props.name);
  }

  render() {
    const { directorInfo } = this.state;

    return (
      <div className="director-view">
        <div className="director-name">
          <span className="label">Director Name: </span>
          <span className="value">{directorInfo.Name}</span>
        </div>
        <br />
        <div className="director-bio">
          <span className="label">Biography: </span>
          <span className="value">{directorInfo.Bio}</span>
        </div>
        <br />
        <div className="director-birth">
          <span className="label">Born: </span>
          <span className="value">{directorInfo.Birth}</span>
        </div>

        <br />
        <Link to={`/`} className="home-button">
          <Button variant="link">Home</Button>
        </Link>
      </div>
    );
  }
}

DirectorView.propTypes = {
  name: PropTypes.string.isRequired,
};

export default connect(null, {})(DirectorView);
