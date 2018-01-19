import PropTypes from 'prop-types'
import SimpleHeader from '../SimpleHeader'
import './index.scss'

const mapHeader = def => <SimpleHeader key={def.key} label={def.label || def.key} />

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
