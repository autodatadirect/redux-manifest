import PropTypes from 'prop-types'

const Rows = ({data, mapRow}) => {
  return (
    <tbody>
      {data.map(mapRow)}
    </tbody>
  )
}

Rows.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  mapRow: PropTypes.func.isRequired
}

export default Rows
