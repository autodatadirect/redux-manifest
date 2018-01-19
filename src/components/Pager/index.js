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

const PreviousButton = ({currentPage, changePage}) => {
  if (currentPage === 0) return null
  return (
    <div data-page={currentPage - 1} className='btn btn-default pager-button previous' onClick={changePage}>
      {'Previous'}
    </div>
  )
}

const NextButton = ({currentPage, totalPages, changePage}) => {
  if (currentPage === totalPages - 1) return null
  return (
    <div data-page={currentPage + 1} className='btn btn-default pager-button next' onClick={changePage}>
      {'Next'}
    </div>
  )
}

const LastButton = ({currentPage, totalPages, changePage}) => {
  if (currentPage === totalPages - 1) return null
  return (
    <div data-page={totalPages - 1} className='btn btn-default pager-button last' onClick={changePage}>
      {'Last'}
    </div>
  )
}

// TODO handle remainder correctly
const determineTotalPages = (pageSize, count) => count / pageSize

const determinePages = (currentPage, count) => {
  const pages = []
  const totalPages = determineTotalPages(currentPage, count)
  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i > 0 && i <= totalPages) pages.push(i - 1)
  }

  return pages
}

const PageButton = ({page, currentPage, changePage}) => (
  <div data-page={page} className='btn pager-button btn btn-default' onClick={changePage}>
    {page + 1}
  </div>
)

const Pager = ({changePage, filter, count}) => {
  const handlePageChange = (a, b) => console.log('handlePageChange', a, b)

  const totalPages = 300

  const currentPage = 30

  return (
    <div className='manifest-pager'>
      <FirstButton changePage={changePage} currentPage={currentPage} />
      <PreviousButton changePage={changePage} currentPage={currentPage} />
      {determinePages(currentPage, count).map((page, index) => (
        <PageButton key={index} page={page} currentPage={currentPage} changePage={changePage} />
      ))}
      <NextButton changePage={changePage} currentPage={currentPage} totalPages={totalPages} />
      <LastButton changePage={changePage} currentPage={currentPage} totalPages={totalPages} />      
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
