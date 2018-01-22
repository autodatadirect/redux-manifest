import React from 'react'
import PropTypes from 'prop-types'

const CellEpochDate = ({id, value}) => <td>{new Date(value).toISOString().replace(/(.*?)T.*/, '$1')}</td>

CellEpochDate.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

export default CellEpochDate
