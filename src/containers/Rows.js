import { connect } from 'react-redux'

import Rows from '../components/Rows'
import stateByName from '../util/stateByName'

const buildArrayOfRowData = (data, props) => {
  const rows = []
  for (let i = 0; i < data.length; i++) {
    rows.push({
      data: data[i],
      name: props.name,
      definition: props.definition,
      onRowClick: props.onRowClick
    })
  }
  return rows
}

const mapStateToProps = (state, props) => {
  const namedState = stateByName(state, props.name)
  return {
    rows: buildArrayOfRowData(namedState.data, props)
  }
}

export default connect(mapStateToProps)(Rows)
