import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import * as actions from '../actions'
import Headers from '../components/Headers'
import stateByName from '../util/stateByName'

const mapStateToProps = (state, props) => {
  const namedState = stateByName(state, props.name)
  return {
    sorts: namedState.filter.sorts,
    filter: namedState.filter,
    loading: namedState.loadingCount || namedState.loadingData
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  refreshData: actions.refreshData,
  refreshCount: actions.refreshCount
}, dispatch)

const hasClass = (className, classString) => classString.match(className) !== null

const updateFilterSort = (id, isAsc, sorts) => [{id, isAsc}]

const handlers = {
  updateSort: props => event => {
    const isAsc = !hasClass('sorted-asc', event.target.className)
    const id = event.target.getAttribute('data-id')
    const updatedFilter = {...props.filter, sorts: updateFilterSort(id, isAsc, props.filter.sorts)}
    if (updatedFilter && !updatedFilter.page) {
      props.refreshCount(props.name, updatedFilter)
    }
    props.refreshData(props.name, updatedFilter)
  }
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlers)
)

export default enhance(Headers)
