import React from 'react'
import PropTypes from 'prop-types'

const Cell = ({ rowId, value }) => <td>{value}</td>

const mapCell = rowCell => {
  const def = rowCell.def
  const data = rowCell.data
  const cellProps = {
    key: def.id,
    rowId: def.id,
    value: data[def.id],
    row: data,
    filter: rowCell.filter
  }
  if (def.cellComponent) return <def.cellComponent {...cellProps} />
  return <Cell {...cellProps} />
}

const Row = ({id, rowCells, handleRowClick, focused}) => (
  <tr data-id={id} onClick={handleRowClick} className={'manifest-row' + (focused ? ' focused' : '')}>
    {rowCells.map(mapCell)}
  </tr>
)

Row.propTypes = {
  id: PropTypes.any.isRequired,
  rowCells: PropTypes.array.isRequired,
  handleRowClick: PropTypes.func.isRequired,
  focused: PropTypes.bool.isRequired
}

Cell.propTypes = {
  rowId: PropTypes.any.isRequired,
  value: PropTypes.any
}

export default Row
