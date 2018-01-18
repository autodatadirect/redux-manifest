import PropTypes from 'prop-types'
import './index.scss'

const mapHeader = def => (
  <th key={def.key} data-key={def.key}>{
    def.label || def.key}
  </th>
)

const Headers = ({definition}) => {
  return (
    <thead>
      <tr>
        {definition.map(mapHeader)}
      </tr>
    </thead>
  )
}

Headers.propTypes = {
  definition: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string
    }).isRequired
  )
}

export default Headers
