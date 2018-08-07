import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import PageSizer from '../components/PageSizer'
import * as actions from '../actions'
import stateByName from '../util/stateByName'

const mapStateToProps = (state, props) => {
  const namedState = stateByName(state, props.name)
  return {
    filter: namedState.filter,
    loading: namedState.loadingCount || namedState.loadingData
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  refreshData: actions.refreshData,
  refreshCount: actions.refreshCount
}, dispatch)

const handlers = {
  changePageSize: props => event => {
    const pageSize = event.target.value
    const updatedFilter = {...props.filter, page: 0, pageSize}
    props.refreshCount(props.name, updatedFilter)
    props.refreshData(props.name, updatedFilter)
  }
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlers)
)

export default enhance(PageSizer)
