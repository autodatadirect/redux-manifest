import { connect } from 'react-redux'

import Row from '../components/Row'

const buildArrayOfRowCellData = props => {
  const definition = props.definition
  const rowCells = []
  for (let i = 0; i < definition.length; i++) {
    rowCells.push({def: definition[i], data: props.data})
  }
  return rowCells
}

const mapStateToProps = (state, props) => {
  return {
    rowCells: buildArrayOfRowCellData(props)
  }
}

export default connect(mapStateToProps)(Row)
