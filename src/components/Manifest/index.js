import PropTypes from 'prop-types'
import './index.scss'

import Rows from '../../containers/Rows'
import Headers from '../Headers'
import Pager from '../../containers/Pager'

/*
- id is required (rethink this)
*/

const Manifest = ({name, definition}) => {
  return (
    <div>
      <table className='manifest'>
        <Headers definition={definition} />
        <Rows name={name} definition={definition} />
      </table>
      <Pager name={name} />
    </div>
  )
}

Manifest.propTypes = {
  name: PropTypes.string.isRequired,
  definition: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string
    }).isRequired
  )
}

export default Manifest
