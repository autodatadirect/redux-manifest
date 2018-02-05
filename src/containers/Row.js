import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import Row from '../components/Row'
import * as actions from '../actions'
import stateByName from '../util/stateByName'

const buildArrayOfRowCellData = props => {
  const definition = props.definition
  const rowCells = []
  for (let i = 0; i < definition.length; i++) {
    rowCells.push({def: definition[i], data: props.data})
  }
  return rowCells
}

const mapStateToProps = (state, props) => {
  const namedState = stateByName(state, props.name)
  return {
    rowCells: buildArrayOfRowCellData(props),
    focused: namedState.focused + '' === props.id + ''
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  focusRow: actions.focusRow
}, dispatch)

const handlers = {
  handleRowClick: props => event => props.focusRow(props.name, event.currentTarget.getAttribute('data-id'))
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlers)
)

export default enhance(Row)
