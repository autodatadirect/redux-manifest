import React from 'react'
import PropTypes from 'prop-types'
import Row from '../Row'

const mapRow = row => <Row key={row.data.id} id={row.data.id} name={row.name} definition={row.definition} data={row.data} onRowClick={row.onRowClick} />

const Rows = ({rows, onRowClick}) => {
  return (
    <tbody>
      {rows.map(mapRow)}
    </tbody>
  )
}

Rows.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  onRowClick: PropTypes.func
}

export default Rows
