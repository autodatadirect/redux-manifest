import React from 'react'
import PropTypes from 'prop-types'
import SimpleHeader from '../SimpleHeader'

const reduceSort = id => (chosen, current) => chosen || current.id === id ? current : null

const getSort = (id, sorts) => sorts.reduce(reduceSort(id), null)

const sortIsAsc = sort => sort && sort.isAsc

const mapHeader = (sorts, updateSort, loading) => def => {
  const headerProps = {
    id: def.id,
    loading: loading,
    label: def.label || def.id,
    sortable: def.sortable || false,
    updateSort: (loading || !def.sortable) ? () => null : updateSort,
    sortAsc: sortIsAsc(getSort(def.id, sorts))
  }
  if (def.headerComponent) return <def.headerComponent {...headerProps} />
  return <SimpleHeader key={headerProps.id} {...headerProps} />
}

const Headers = ({definition, sorts, updateSort, loading}) => {
  return (
    <thead>
      <tr>
        {definition.map(mapHeader(sorts, updateSort, loading))}
      </tr>
    </thead>
  )
}

Headers.propTypes = {
  name: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  updateSort: PropTypes.func.isRequired,
  sorts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      isAsc: PropTypes.bool.isRequired
    })
  ).isRequired,
  definition: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string,
      sortable: PropTypes.Boolean
    }).isRequired
  )
}

export default Headers
