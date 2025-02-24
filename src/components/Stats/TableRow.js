import React from 'react';
import PropTypes from 'prop-types';

const TableRow = ({
  label, link, value, format,
}) => (
  <tr>
    <td>{link ? <a href={link}>{format(label)}</a> : format(label)}</td>
    <td><code>{format(value)}</code></td>
  </tr>
);

TableRow.propTypes = {
  format: PropTypes.func,
  label: PropTypes.string.isRequired,
  link: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.number,
    PropTypes.string,
  ]),
};

TableRow.defaultProps = {
  format: (x) => x,
  link: null,
  value: null,
};

export default TableRow;
