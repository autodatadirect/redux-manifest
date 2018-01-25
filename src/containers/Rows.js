import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import Row from '../containers/Row'

import Rows from '../components/Rows'
import stateByName from '../util/stateByName'

const mapStateToProps = (state, props) => {
  const namedState = stateByName(state, props.name)
  return {
    data: namedState.data
  }
}

const handlers = {
  mapRow: props => row => <Row key={row.id} name={props.name} definition={props.definition} data={row} />
}

const enhance = compose(
  connect(mapStateToProps),
  withHandlers(handlers)
)

export default enhance(Rows)
