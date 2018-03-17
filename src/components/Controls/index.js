import React from 'react'
import PropTypes from 'prop-types'
import Pager from '../../containers/Pager'
import PageSizer from '../../containers/PageSizer'
import Status from '../../containers/Status'

const Controls = ({name}) => (
  <div className='manifest-controls'>
    <PageSizer name={name} />
    <Status name={name} />
    <Pager name={name} />
  </div>
)

Controls.propTypes = {
  name: PropTypes.string.isRequired
}

export default Controls
