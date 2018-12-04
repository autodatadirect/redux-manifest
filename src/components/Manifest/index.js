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

const countNeeded = filter => filter && !filter.page
const lifecycleMethods = {
  componentWillMount () {
    propsVerification(this.props)
    if (this.props.inMemoryData && this.props.inMemoryData.length) {
      this.props.setInMemoryData(this.props.name, this.props.inMemoryData)
      filterFunctions.register(this.props.name, this.props.filterFn)
    } else if (this.props.autoLoad !== false) {
      if (countNeeded(this.props.filter)) {
        this.props.refreshCount(this.props.name, this.props.filter)
      }
      this.props.refreshData(this.props.name, this.props.filter)
    }
  },
  componentWillUnmount () {
    filterFunctions.deregister(this.props.name, this.props.filterFn)
    this.props.destroy(this.props.name)
  },
  componentDidUpdate (prevProps, prevState, prevContext) {
    if (this.props.inMemoryData && this.prop.inMemoryData.length && this.props.inMemoryDataHasChanged) {
      this.props.setInMemoryData(this.props.name, this.props.inMemoryData)
      filterFunctions.register(this.props.name, this.props.filterFn)
    }
    if (isEqual(this.props.filter, prevProps.filter)) return
    this.props.refreshData(this.props.name, this.props.filter)
  }
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle(lifecycleMethods)
)

export default enhance(Manifest)
