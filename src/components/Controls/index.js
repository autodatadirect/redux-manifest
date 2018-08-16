import React from 'react'
import PropTypes from 'prop-types'
import Pager from '../Pager'
import PageSizer from '../PageSizer'
import Status from '../Status'

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
