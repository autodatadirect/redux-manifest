import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const PagerButton = ({page, currentPage, changePage, children, className}) => {
  let buttonStyle = 'btn pager-button'
  if (className) buttonStyle += ' ' + className
  buttonStyle += currentPage === page ? ' btn-primary' : 'btn-default'
  return (
    <button data-page={page} className={buttonStyle} onClick={changePage}>
      {children}
    </button>
  )
}

const FirstButton = ({currentPage, changePage}) => {
  if (currentPage < 2) return null
  return (
    <PagerButton className={'first'} page={0} currentPage={currentPage} changePage={changePage}>
      {'First'}
    </PagerButton>
  )
}

const PreviousButton = ({currentPage, changePage}) => {
  if (currentPage === 0) return null
  return (
    <PagerButton className={'previous'} page={currentPage - 1} currentPage={currentPage} changePage={changePage}>
      {'Previous'}
    </PagerButton>
  )
}

const NextButton = ({currentPage, totalPages, changePage}) => {
  if (currentPage === totalPages - 1) return null
  return (
    <PagerButton className={'next'} page={currentPage + 1} currentPage={currentPage} changePage={changePage}>
      {'Next'}
    </PagerButton>
  )
}

const LastButton = ({currentPage, totalPages, changePage}) => {
  if (currentPage === totalPages - 1) return null
  return (
    <PagerButton className={'last'} page={totalPages - 1} currentPage={currentPage} changePage={changePage}>
      {'Last'}
    </PagerButton>
  )
}

// TODO handle remainder correctly
const determineTotalPages = (pageSize, count) => Math.round(count / pageSize)

const determinePages = (currentPage, totalPages) => {
  const pages = []
  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i > 0 && i <= totalPages) pages.push(i - 1)
  }
  console.log('determinePages', currentPage, totalPages, pages)
  return pages
}

const Pager = ({changePage, filter = {}, count}) => {
  if (count === undefined || count === null) {
    return 'loading ...'
  }

  const currentPage = filter.page
  const totalPages = determineTotalPages(filter.pageSize, count)

  console.log('Pager Render: ', currentPage, totalPages)

  return (
    <div className='manifest-pager'>
      <FirstButton changePage={changePage} currentPage={currentPage} />
      <PreviousButton changePage={changePage} currentPage={currentPage} />
      {determinePages(currentPage, totalPages).map((page, index) => (
        <PagerButton key={index} page={page} currentPage={currentPage} changePage={changePage}>
          {page + 1}
        </PagerButton>
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
  count: PropTypes.number
}

export default Pager
