import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'

import * as actions from '../actions'
import Manifest from '../components/Manifest'

const STORE_KEY = 'manifest'

const stateByName = (state, name) => state[STORE_KEY][name] || {}

const mapStateToProps = (state, props) => ({
  data: stateByName(state, props.name).data,
  count: stateByName(state, props.name).count
})

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
