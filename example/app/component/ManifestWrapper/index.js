import React from 'react'
import PropTypes from 'prop-types'
import { Manifest } from 'redux-manifest'
import definition from './manifest.def'
import { withState, withHandlers, compose } from 'recompose'
// import { compileInMemoryResult } from '../../services/manifest'

const onRowClick = row => console.log('You clicked the following row: ', row)

const MountUnMountButton = ({toggleVisible}) =>
  <button onClick={toggleVisible}>Click to mount/unmount</button>

// const filterFn = (data, filter) => data.filter(datum => datum.age > 30)

const filter = {search: 'test', id: 123}
const ManifestWrapper = ({toggleVisible, visible}) => {
  if (!visible) return <MountUnMountButton toggleVisible={toggleVisible} />
  return (
    <div>
      {/* <Manifest name='testManifestMem' definition={definition} data={compileInMemoryResult(filter).data} onRowClick={onRowClick} filter={filter} filterFn={filterFn} /> */}
      <Manifest name='testManifest' definition={definition} onRowClick={onRowClick} filter={filter} />
      <MountUnMountButton toggleVisible={toggleVisible} />
    </div>
  )
}

const enhance = compose(
  withState('visible', 'setVisible', true),
  withHandlers({
    toggleVisible: ({ visible, setVisible }) => () => setVisible(!visible)
  })
)

ManifestWrapper.propTypes = {
  visible: PropTypes.bool.isRequired,
  toggleVisible: PropTypes.func.isRequired
}

export default enhance(ManifestWrapper)
