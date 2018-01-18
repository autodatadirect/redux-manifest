import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const handlePageChange = (page, handlePageChangeProp) => {
  return handlePageChangeProp(page)
}

const FirstButton = ({currentPage, changePage}) => {
  if (currentPage < 2) return null
  return (
    <div data-page={0} className='btn btn-default pager-button first' onClick={changePage}>
      {'First'}
    </div>
  )
}

const renderPrevious = (currentPage, handlePageChangeProp) => {
  if (currentPage > 1) {
    return (
      <div
        className='btn btn-default pager-button previous'
        onClick={() => handlePageChange(currentPage - 1, handlePageChangeProp)}>
        {'Previous'}
      </div>
    )
  }
}

const renderNext = (currentPage, totalPages, handlePageChangeProp) => {
  if (currentPage < totalPages) {
    return (
      <div
        className='btn btn-default pager-button next'
        onClick={() => handlePageChange(currentPage + 1, handlePageChangeProp)}>
        {'Next'}
      </div>
    )
  }
}

const renderLast = (currentPage, totalPages, handlePageChangeProp) => {
  if (currentPage < totalPages - 1) {
    return (
      <div
        className='btn btn-default pager-button last'
        onClick={() => handlePageChange(totalPages, handlePageChangeProp)}>
        {'Last'}
      </div>
    )
  }
}

// TODO handle remainder correctly
const determineTotalPages = (pageSize, count) => count / pageSize

const determinePages = (currentPage, count) => {
  const pages = []
  const totalPages = determineTotalPages(currentPage, count)

  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i > 0 && i <= totalPages) pages.push(i)
  }

  return pages
}

const renderPages = (currentPage, totalPages, handlePageChangeProp) => {
  const pages = []
  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i > 0 && i <= totalPages) {
      if (i === currentPage) {
        pages.push(<div key={i} className='pager-button btn btn-primary current disabled'>{i}</div>)
      } else {
        pages.push(
          <div
            key={i}
            className='btn pager-button btn btn-default'
            onClick={() => handlePageChange(i, handlePageChangeProp)}>
            {i}
          </div>
        )
      }
    }
  }

  return pages
}

const PageButton = ({page, currentPage, changePage}) => (
  <div data-page={page} className='btn pager-button btn btn-default' onClick={changePage}>
    {page}
  </div>
)

const Pager = ({changePage, filter, count}) => {
  const handlePageChange = (a, b) => console.log('handlePageChange', a, b)

  const totalPages = 300

  const currentPage = 3

  return (
    <div className='manifest-pager'>
      <FirstButton changePage={changePage} currentPage={currentPage} />
      {renderPrevious(currentPage, handlePageChange)}
      {renderPages(currentPage, totalPages, handlePageChange)}
      {renderNext(currentPage, totalPages, handlePageChange)}
      {renderLast(currentPage, totalPages, handlePageChange)}
    </div>
  )
}

Pager.propTypes = {
  name: PropTypes.string.isRequired,
  changePage: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired
}

export default Pager
