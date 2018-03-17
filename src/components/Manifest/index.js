import React from 'react'
import PropTypes from 'prop-types'
import Rows from '../../containers/Rows'
import Headers from '../../containers/Headers'
import Controls from '../Controls'

const Manifest = ({name, definition, loading, error, onRowClick}) => {
  return (
    <div className={'manifest table' + (loading ? ' loading' : '') + (error ? ' manifest-error' : '')}>
      <table>
        <Headers name={name} definition={definition} />
        <Rows name={name} definition={definition} onRowClick={onRowClick} />
      </table>
      <Controls name={name} />
    </div>
  )
}

Manifest.propTypes = {
  name: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  definition: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string
    }).isRequired
  ),
  onRowClick: PropTypes.func
}

export default Manifest
