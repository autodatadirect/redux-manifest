import PropTypes from 'prop-types'

const Row = ({definition, mapCell}) => (
  <tr>
    {definition.map(mapCell)}
  </tr>
)

Row.propTypes = {
  definition: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string
    }).isRequired
  ),
  mapCell: PropTypes.func.isRequired
}

export default Row
