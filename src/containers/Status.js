import { connect } from 'react-redux'
import Status from '../components/Status'

const STORE_KEY = 'manifest'

const stateByName = (state, name) => state[STORE_KEY][name] || {}

const mapStateToProps = (state, props) => ({
  filter: stateByName(state, props.name).filter,
  count: stateByName(state, props.name).count,
  loadingCount: stateByName(state, props.name).loadingCount
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Status)
