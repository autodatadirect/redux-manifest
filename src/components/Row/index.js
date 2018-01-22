import PropTypes from 'prop-types'

const Cell = ({id, value}) => <td id={id}>{value}</td>

const mapCell = data => def => {
  if (def.cellComponent) return <def.cellComponent key={def.id} id={def.id} value={data[def.id]} />
  return <Cell key={def.id} id={def.id} value={data[def.id]} />
}

const Row = ({definition, data}) => (
  <tr>
    {definition.map(mapCell(data))}
  </tr>
)

Row.propTypes = {
  data: PropTypes.object.isRequired,
  definition: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string
    }).isRequired
  )
}

export default Row
