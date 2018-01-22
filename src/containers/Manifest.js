import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'

import * as actions from '../actions'
import Manifest from '../components/Manifest'
import stateByName from '../util/stateByName'

const mapStateToProps = (state, props) => {
  const namedState = stateByName(state, props.name)
  return {
    data: namedState.data,
    error: namedState.error,
    loading: namedState.loadingCount || namedState.loadingData
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  refreshData: actions.refreshData
}, dispatch)

const lifecycleMethods = {
  componentWillMount () {
    this.props.refreshData(this.props.name, {})
  }
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle(lifecycleMethods)
)

export default enhance(Manifest)
