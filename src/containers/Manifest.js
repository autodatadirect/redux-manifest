import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import isEqual from 'lodash/isEqual'

import * as actions from '../actions'
import Manifest from '../components/Manifest'
import stateByName from '../util/stateByName'

const mapStateToProps = (state, props) => {
  const namedState = stateByName(state, props.name)
  return {
    data: namedState.data,
    error: namedState.error,
    loading: namedState.loadingData,
    providedFilter: props.filter,
    filter: {...namedState.filter, ...props.filter},
    inMemoryData: props.data
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  refreshData: actions.refreshData,
  setInMemoryData: actions.setInMemoryData,
  destroy: actions.destroy
}, dispatch)

const lifecycleMethods = {
  componentWillMount () {
    if (this.props.inMemoryData) {
      this.props.setInMemoryData(this.props.name, this.props.inMemoryData)
    } else {
      this.props.refreshData(this.props.name, this.props.filter)
    }
  },
  componentWillUnmount () {
    this.props.destroy(this.props.name)
  },
  componentDidUpdate (prevProps, prevState, prevContext) {
    if (isEqual(this.props.providedFilter, prevProps.providedFilter)) return
    this.props.refreshData(this.props.name, this.props.filter)
  }
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle(lifecycleMethods)
)

export default enhance(Manifest)
