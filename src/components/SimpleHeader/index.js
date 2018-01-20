import PropTypes from 'prop-types'
import './index.scss'

const buildHeaderClass = (hdr, changeManifestFilter) => {
  if (!isSortable(hdr, changeManifestFilter)) {
    return
  }
  return 'sortable'
}

const isSortable = (hdr, changeManifestFilter) => {
  return !!(changeManifestFilter && hdr.sort)
}

const sortStyle = (id, sortAsc) => {
  if (sortAsc === null || sortAsc === undefined) return ''
  return sortAsc ? 'sorted-asc' : 'sorted-desc'
}

const SimpleHeader = ({id, label, sortAsc, updateSort, loading}) => (
  <th data-id={id} onClick={updateSort} className={'manifest-header ' + sortStyle(id, sortAsc) + (loading ? ' loading' : '')}>
    {label}
  </th>
)

SimpleHeader.propTypes = {
  id: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  updateSort: PropTypes.func.isRequired,
  sortAsc: PropTypes.bool
}

export default SimpleHeader
