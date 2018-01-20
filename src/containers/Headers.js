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
  refreshData: actions.refreshData
}, dispatch)

const hasClass = (className, classString) => classString.match(className) !== null

const updateFilterSort = (id, isAsc, sorts) => [{id, isAsc}]

const handlers = {
  updateSort: props => event => {
    const isAsc = !hasClass('sorted-asc', event.target.className)
    const id = event.target.getAttribute('data-id')
    props.refreshData(props.name, {...props.filter, sorts: updateFilterSort(id, isAsc, props.filter.sorts)})
  }
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlers)
)

export default enhance(Headers)
