import React from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { setFilter } from '../../actions/actions';

/**
 * filter movie list element
 * @function VisibilityFilterInput
 * @param {*} props
 * @requires react
 * @requires react-redux
 * @requires react-bootstrap/Form
 * @requires '../../actions/actions'
 */
function VisibilityFilterInput(props) {
  return (
    <Form.Control
      className="filter"
      onChange={(e) => props.setFilter(e.target.value.toLowerCase())}
      value={props.visibilityFilter}
      placeholder="Filter by Title"
    />
  );
}

export default connect(null, { setFilter })(VisibilityFilterInput);
