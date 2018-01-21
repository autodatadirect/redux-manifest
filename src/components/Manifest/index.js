import PropTypes from 'prop-types'
import './index.scss'

import Rows from '../../containers/Rows'
import Headers from '../../containers/Headers'
import Controls from '../Controls'

/*
TODO
- tests
- page remainder
- error handling
- clickable / non-clickable headers
- focus / hover rows
- scss cleanup with theme file
- simple header style
- custom cells
- custom headers
- custom filter (search)
- cleanup / simplify example
- client-side cached mode, with example
- readme
- multiple sorts
- settings (pager sizer, status), or allow component override
- handle independent count action
- build with decoupled css
- TravisCI
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
