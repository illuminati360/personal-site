import React from 'react';
import PropTypes from 'prop-types';

const Empty = (props) => (
  <div id="main">
    {props.children}
  </div>
);

Empty.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Empty.defaultProps = {
  children: null,
};

export default Empty;
