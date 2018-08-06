import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { compose, withHandlers, lifecycle } from 'recompose'

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

const updateFilterSort = (id, isAsc) => [{id, isAsc}]

const handlers = {
  updateSort: props => event => {
    const isAsc = !hasClass('sorted-asc', event.target.className)
    const id = event.target.getAttribute('data-id')
    props.refreshData(props.name, {...props.filter, sorts: updateFilterSort(id, isAsc)})
  }
}

const sort = props => {
  // multi column sort support not implemented
  // lowest sort integer column sorts asc
  let sortRank
  let sortId

  const filterSort = def => {
    if (!sortRank && def.sort) {
      sortRank = def.sort
      sortId = def.id
    }
    if (def.sort && def.sort < sortRank) {
      sortId = def.id
    }
  }

  props.definition.filter(filterSort)
  if (sortId) {
    props.refreshData(props.name, {...props.filter, sorts: updateFilterSort(sortId, true)})
  }
}

const lifecycleHandlers = {
  componentWillMount () {
    sort(this.props)
  }
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle(lifecycleHandlers),
  withHandlers(handlers)
)

export default enhance(Headers)
