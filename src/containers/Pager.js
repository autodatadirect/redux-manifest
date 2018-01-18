import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import Pager from '../components/Pager'
import * as actions from '../actions'

const STORE_KEY = 'manifest'

const stateByName = (state, name) => state[STORE_KEY][name] || {}

const mapStateToProps = (state, props) => ({
  filter: stateByName(state, props.name).filter,
  count: stateByName(state, props.name).count
})

const mapDispatchToProps = dispatch => bindActionCreators({
  refreshData: actions.refreshData
}, dispatch)

// export default connect(mapStateToProps, mapDispatchToProps)(Pager)

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
