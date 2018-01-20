import PropTypes from 'prop-types'
import Row from '../Row'

// const renderLoadingRow = length => {
//   return (
//     <tr className='loading'>
//       <td colSpan={length}>{'loading'}</td>
//     </tr>
//   )
// }

// const renderNoRecordsRow = length => {
//   return (
//     <tr className='no-records'>
//       <td colSpan={length}>{'No Records'}</td>
//     </tr>
//   )
// }

const Rows = ({definition, data}) => {
  // if (loadingData) {
  //   return renderLoadingRow(def.columns.length)
  // }
  // if (!data || data.length === 0) {
  //   return renderNoRecordsRow(def.columns.length)
  // }
  return (
    <tbody>
      {data.map(row => <Row key={row.id} definition={definition} data={row} />)}
    </tbody>
  )
}

Rows.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  definition: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string
    }).isRequired
  )
}

export default Rows
