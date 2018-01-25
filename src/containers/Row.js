import { compose, withHandlers } from 'recompose'

import Row from '../components/Row'

const Cell = ({id, row}) => <td id={id}>{row[id]}</td>

const handlers = {
  mapCell: props => def => {
    if (def.cellComponent) return <def.cellComponent key={def.id} value={props.data[def.id]} />
    return <Cell key={def.id} id={def.id} row={props.data} />
  }
}

const enhance = compose(
  withHandlers(handlers)
)

export default enhance(Row)
