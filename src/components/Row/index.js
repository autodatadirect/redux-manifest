import PropTypes from 'prop-types'

const Cell = ({id, row}) => <td id={id}>{row[id]}</td>

const mapCell = rowCell => {
  const def = rowCell.def
  const data = rowCell.data
  if (def.cellComponent) return <def.cellComponent key={def.id} value={data[def.id]} />
  return <Cell key={def.id} id={def.id} row={data} />
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

export default Row
