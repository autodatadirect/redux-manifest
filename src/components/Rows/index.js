import PropTypes from 'prop-types'
import Row from '../../containers/Row'

const mapRow = row => <Row key={row.data.id} name={row.name} definition={row.definition} data={row.data} />

const Rows = ({rows}) => {
  return (
    <tbody>
      {rows.map(mapRow)}
    </tbody>
  )
}

Rows.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired
}

export default Rows
