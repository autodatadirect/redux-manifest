import PropTypes from 'prop-types'

/*

const buildHeaderClass = (hdr, changeManifestFilter) => {
  if (!isSortable(hdr, changeManifestFilter)) {
    return
  }
  return 'sortable'
}

const isSortable = (hdr, changeManifestFilter) => {
  return !!(changeManifestFilter && hdr.sort)
}

const drawHeaderSortIcon = (hdr, sorts, changeManifestFilter) => {
  if (!isSortable(hdr, changeManifestFilter)) {
    return
  }
  if (!sorts) {
    return
  }

  let ret
  sorts.forEach(sort => {
    if (sort.field === hdr.sort) {
      if (sort.direction === 'Ascending') {
        ret = <span key={hdr.header + '_sort'} className='sort'>▲</span>
      } else {
        ret = <span key={hdr.header + '_sort'} className='sort'>▼</span>
      }
    }
  })
  return ret
}

const buildHeaderClick = (hdr, filter, changeManifestFilter) => {
  let dir = 'Descending'
  const sortFilter = filter.sort

  if (!isSortable(hdr, changeManifestFilter)) {
    return
  }

  if (sortFilter) {
    sortFilter.forEach(sort => {
      if (sort.field === hdr.sort && sort.direction === 'Descending') {
        dir = 'Ascending'
      }
    })
  }

  return changeManifestFilter({
    sort: [{field: hdr.sort, direction: dir}]
  })
}

*/

const SimpleHeader = ({key, label}) => (
  <th key={key} data-key={key}>
    {label}
  </th>
)

SimpleHeader.propTypes = {
  key: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export default SimpleHeader
