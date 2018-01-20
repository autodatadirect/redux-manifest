import PropTypes from 'prop-types'
// import Cell from './Cell'

// const DEFAULT_CLASSNAME_FUNC =

// const buildRowClassName = (row, col, onRowClick, classNameFunc) => {
//   let className = classNameFunc(row)
//   if (onRowClick) {
//     className += 'clickable '
//   }
//   return className
// }

const Row = ({definition, data}) => (
  <tr>
    {definition.map(def => <td key={def.id}>{data[def.id]}</td>)}
  </tr>
)

Row.propTypes = {
  data: PropTypes.object.isRequired,
  definition: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string
    }).isRequired
  )
}

export default Row
