import PropTypes from 'prop-types'
import './index.scss'

import Rows from '../../containers/Rows'
import Headers from '../Headers'
import Controls from '../Controls'

/*
TODO
- id is required (rethink this)
*/

const Manifest = ({name, definition, loading}) => {
  return (
    <div className={'manifest table' + (loading ? ' loading' : '')}>
      <table>
        <Headers definition={definition} />
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
      key: PropTypes.string.isRequired,
      label: PropTypes.string
    }).isRequired
  )
}

export default Manifest
