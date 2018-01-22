import { connect } from 'react-redux'
import Status from '../components/Status'

import stateByName from '../util/stateByName'

const mapStateToProps = (state, props) => {
  const namedState = stateByName(state, props.name)
  return {
    filter: namedState.filter,
    count: namedState.count,
    loadingCount: namedState.loadingCount,
    error: namedState.error
  }
}

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Status)
