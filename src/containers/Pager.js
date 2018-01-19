import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import Pager from '../components/Pager'
import * as actions from '../actions'
import stateByName from '../util/stateByName'

const mapStateToProps = (state, props) => {
  const namedState = stateByName(state, props.name)
  return {
    filter: namedState.filter,
    count: namedState.count,
    loading: namedState.loadingCount || namedState.loadingData
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  refreshData: actions.refreshData
}, dispatch)

const handlers = {
  changePage: props => event => {
    const nextPage = event.target.getAttribute('data-page')
    props.refreshData(props.name, {...props.filter, page: nextPage})
  }
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlers)
)

export default enhance(Pager)
