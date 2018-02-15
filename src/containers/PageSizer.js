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
  refreshData: actions.refreshData
}, dispatch)

const handlers = {
  changePageSize: props => event => {
    const pageSize = event.target.value
    props.refreshData(props.name, {...props.filter, page: 0, pageSize: pageSize})
  }
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlers)
)

export default enhance(PageSizer)
