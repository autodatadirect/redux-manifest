import PropTypes from 'prop-types'
import './index.scss'

import Rows from '../../containers/Rows'
import Headers from '../../containers/Headers'
import Controls from '../Controls'

/*
TODO
- id is required (rethink this)
*/

const Manifest = ({name, definition, loading}) => {
  return (
    <div className={'manifest table' + (loading ? ' loading' : '')}>
      <table>
        <Headers name={name} definition={definition} />
        <Rows name={name} definition={definition} />
      </table>
      <Controls name={name} />
    </div>
  )
}

Manifest.propTypes = {
  name: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  definition: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string
    }).isRequired
  )
}

export default Manifest
