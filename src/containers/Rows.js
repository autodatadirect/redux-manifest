import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Rows from '../components/Rows'

const STORE_KEY = 'manifest'

const stateByName = (state, name) => state[STORE_KEY][name] || {}

const mapStateToProps = (state, props) => ({
  data: stateByName(state, props.name).data
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Rows)
