import React from 'react'
import PropTypes from 'prop-types'

const CellEpochDate = ({value}) => <td>{new Date(value).toISOString().replace(/(.*?)T.*/, '$1')}</td>

CellEpochDate.propTypes = {
  value: PropTypes.number.isRequired
}

export default CellEpochDate
