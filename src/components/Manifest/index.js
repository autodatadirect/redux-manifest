import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import isEqual from 'lodash/isEqual'

import * as actions from '../../actions'
import Manifest from './component'
import stateByName from '../../util/stateByName'
import * as filterFunctions from '../../util/filterFnRegistry'

const mapStateToProps = (state, props) => {
  const namedState = stateByName(state, props.name)
  return {
    data: namedState.data,
    error: namedState.error,
    loading: namedState.loadingData,
    providedFilter: props.filter,
    filter: namedState.filter,
    inMemoryDataHasChanged: namedState.inMemoryData !== props.data,
    inMemoryData: props.data
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  refreshData: actions.refreshData,
  refreshCount: actions.refreshCount,
  setInMemoryData: actions.setInMemoryData,
  destroy: actions.destroy
}, dispatch)

const propsVerification = props => {
  if (!props.definition) throw new Error('Manifest definition must be provided!')
  if (!props.name) throw new Error('Manifest name must be provided!')
}

const isFirstPage = filter => filter && filter.page === 0

const isInMemory = ({ inMemoryData }) => inMemoryData && inMemoryData.length

const initializeInMemoryManifest = ({ filterFn, name, inMemoryData, filter, inMemoryDataHasChanged, setInMemoryData }, prevProps) => {
  if (!prevProps || filterFn !== prevProps.filterFn) {
    filterFunctions.register(name, filterFn)
  }
  if (!prevProps || inMemoryDataHasChanged) {
    setInMemoryData(name, inMemoryData, filter)
  }
}

const initializeManifest = ({ name, filter, autoLoad, refreshCount, refreshData }, prevProps) => {
  if (prevProps || autoLoad === false) return
  if (isFirstPage(filter)) {
    refreshCount(name, filter)
  }
  refreshData(name, filter)
}

const handleFilterChange = ({ name, filter, refreshData }, prevProps) => {
  if (!prevProps || isEqual(filter, prevProps.filter)) return
  refreshData(name, filter)
}

const handlePropChanges = (props, prevProps) => {
  propsVerification(props)

  if (isInMemory(props)) {
    initializeInMemoryManifest(props, prevProps)
  } else {
    initializeManifest(props, prevProps)
  }
  handleFilterChange(props, prevProps)
}

const lifecycleMethods = {
  componentWillMount () {
    handlePropChanges(this.props)
  },
  componentWillUnmount () {
    const { name, filterFn, destroy } = this.props
    filterFunctions.deregister(name, filterFn)
    destroy(name)
  },
  componentDidUpdate (prevProps) {
    handlePropChanges(this.props, prevProps)
  }
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle(lifecycleMethods)
)

export default enhance(Manifest)
