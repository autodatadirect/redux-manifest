import React from 'react'
import PropTypes from 'prop-types'

const determineFirstOnPage = (page, pageSize) => Math.max(page * pageSize, 0)

const determineLastOnPage = (page, pageSize, count) => Math.min(determineFirstOnPage(page + 1, pageSize), count)

const renderTotalRecordsMessage = (loadingCount, count, filter, error) => {
  if (loadingCount) return 'loading...'
  if (error) return error
  const last = determineLastOnPage(filter.page, filter.pageSize, count)
  const first = determineFirstOnPage(filter.page, filter.pageSize) + 1
  return count < 1 ? 'No Results' : `Showing ${first} to ${last} of ${count}`
}

const Status = ({loadingCount, filter, count, error}) => (
  <div className={'manifest-status' + (error ? ' manifest-error' : '')}>
    {renderTotalRecordsMessage(loadingCount, count, filter, error)}
  </div>
)

Status.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  loadingCount: PropTypes.bool.isRequired,
  filter: PropTypes.object.isRequired,
  error: PropTypes.string.isRequired
}

export default Status
