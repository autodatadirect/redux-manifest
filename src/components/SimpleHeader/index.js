import React from 'react'
import PropTypes from 'prop-types'

const sortStyle = (id, sortAsc) => {
  if (sortAsc === null || sortAsc === undefined) return ''
  return sortAsc ? ' sorted-asc' : ' sorted-desc'
}

const style = (id, sortAsc, loading, sortable) => {
  let className = 'manifest-header'
  className += sortStyle(id, sortAsc)
  className += loading ? ' loading' : ''
  className += sortable ? ' sortable' : ''
  return className
}

const SimpleHeader = ({id, label, sortAsc, updateSort, loading, sortable}) => (
  <th data-id={id} onClick={updateSort} className={style(id, sortAsc, loading, sortable)}>
    {label}
  </th>
)

SimpleHeader.propTypes = {
  id: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  updateSort: PropTypes.func.isRequired,
  sortAsc: PropTypes.bool,
  sortable: PropTypes.bool.isRequired
}

export default SimpleHeader
