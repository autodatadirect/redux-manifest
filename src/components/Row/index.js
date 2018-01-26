import PropTypes from 'prop-types'

const Cell = ({id, row}) => <td id={id}>{row[id]}</td>

const mapCell = rowCell => {
  const def = rowCell.def
  const data = rowCell.data
  if (def.cellComponent) return <def.cellComponent key={def.id} value={data[def.id]} />
  return <Cell key={def.id} id={def.id} row={data} />
}
const Row = ({rowCells}) => (
  <tr>
    {rowCells.map(mapCell)}
  </tr>
)

Row.propTypes = {
  rowCells: PropTypes.array.isRequired
}

export default Row
