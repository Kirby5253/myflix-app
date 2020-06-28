import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

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
