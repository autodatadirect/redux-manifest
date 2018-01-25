import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import * as pagerLogic from '../components/Pager/pagerLogic'

import Pager from '../components/Pager'
import * as actions from '../actions'
import stateByName from '../util/stateByName'

const buildArrayOfNumberedPagerButtons = namedState => {
  const currentPage = namedState && namedState.filter && namedState.filter.page
  const totalPages = pagerLogic.determineTotalPages(namedState.filter.pageSize, namedState.count)

  const numberedPageButtons = []
  const pages = pagerLogic.determinePages(currentPage, totalPages)
  for (let i = 0; i < pages.length; i++) {
    numberedPageButtons.push({page: pages[i], loading: namedState.loadingCount || namedState.loadingData, currentPage})
  }
  return numberedPageButtons
}

const mapStateToProps = (state, props) => {
  const namedState = stateByName(state, props.name)
  return {
    filter: namedState.filter,
    count: namedState.count,
    loading: namedState.loadingCount || namedState.loadingData,
    numberedPageButtons: buildArrayOfNumberedPagerButtons(namedState, props)
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
