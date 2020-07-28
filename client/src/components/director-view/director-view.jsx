import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './director-view.scss';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

/**
 * allows users to type in the details that they want to change of their account
 * @function DirectorView
 * @requires react
 * @requires react-bootstrap/Button
 * @requires './director-view.scss'
 * @requires react-router-dom
 * @requires react-redux
 */
function DirectorView() {
  const { director } = this.props;

  return (
    <div className="director-view">
      <div className="director-name">
        <span className="label">Director Name: </span>
        <span className="value">{director.Name}</span>
      </div>
      <br />
      <div className="director-bio">
        <span className="label">Biography: </span>
        <span className="value">{director.Bio}</span>
      </div>
      <br />
      <div className="director-birth">
        <span className="label">Born: </span>
        <span className="value">{director.Birth}</span>
      </div>

      <br />
      <Link to={`/`} className="home-button">
        <Button variant="link">Home</Button>
      </Link>
    </div>
  );
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(null, {})(DirectorView);
