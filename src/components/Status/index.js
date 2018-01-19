import React from 'react'
import PropTypes from 'prop-types'

const determineFirstOnPage = (page, pageSize) => Math.max(page * pageSize, 0)

const determineLastOnPage = (page, pageSize, count) => Math.min(determineFirstOnPage(page + 1, pageSize) - 1, count)

const renderTotalRecordsMessage = (loadingCount, count, filter) => {
  if (loadingCount) return 'loading...'
  const last = determineLastOnPage(filter.page, filter.pageSize, count)
  const first = determineFirstOnPage(filter.page, filter.pageSize)
  return `Showing ${first} to ${last} of ${count}`
}

const Status = ({loadingCount, filter, count}) => (
  <div className='total-records'>
    {renderTotalRecordsMessage(loadingCount, count, filter)}
  </div>
)

Status.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  loadingCount: PropTypes.bool.isRequired,
  filter: PropTypes.object.isRequired
}

export default Status
