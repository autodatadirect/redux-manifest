import React from 'react'
import PropTypes from 'prop-types'
import * as logic from './logic'

const PagerButton = ({page, loading, currentPage, changePage, children, className}) => {
  let buttonStyle = 'btn pager-button'
  if (className) buttonStyle += ' ' + className
  buttonStyle += (currentPage === page) ? ' btn-primary' : ' btn-default'
  return (
    <button data-page={page} className={buttonStyle} onClick={changePage} disabled={loading}>
      {children}
    </button>
  )
}

const FirstButton = ({currentPage, loading, changePage}) => {
  if (currentPage < 1) return null
  return (
    <PagerButton loading={loading} className={'first'} page={0} currentPage={currentPage} changePage={changePage}>
      {'First'}
    </PagerButton>
  )
}

const PreviousButton = ({currentPage, loading, changePage}) => {
  if (currentPage === 0) return null
  return (
    <PagerButton loading={loading} className={'previous'} page={currentPage - 1} currentPage={currentPage} changePage={changePage}>
      {'<'}
    </PagerButton>
  )
}

const NextButton = ({currentPage, loading, totalPages, changePage}) => {
  if (currentPage === totalPages - 1) return null
  return (
    <PagerButton loading={loading} className={'next'} page={currentPage + 1} currentPage={currentPage} changePage={changePage}>
      {'>'}
    </PagerButton>
  )
}

const LastButton = ({currentPage, loading, totalPages, changePage}) => {
  if (currentPage === totalPages - 1) return null
  return (
    <PagerButton loading={loading} className={'last'} page={totalPages - 1} currentPage={currentPage} changePage={changePage}>
      {'Last'}
    </PagerButton>
  )
}

const Pager = ({changePage, filter, count, loading}) => {
  const currentPage = filter.page
  const totalPages = logic.determineTotalPages(filter.pageSize, count)

  return (
    <div className='manifest-pager btn-group' role='group' aria-label='pager'>
      <FirstButton loading={loading} changePage={changePage} currentPage={currentPage} />
      <PreviousButton loading={loading} changePage={changePage} currentPage={currentPage} />
      {logic.determinePages(currentPage, totalPages).map((page, index) => (
        <PagerButton loading={loading} key={index} page={page} currentPage={currentPage} changePage={changePage}>
          {page + 1}
        </PagerButton>
      ))}
      <NextButton loading={loading} changePage={changePage} currentPage={currentPage} totalPages={totalPages} />
      <LastButton loading={loading} changePage={changePage} currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}

Pager.propTypes = {
  name: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  changePage: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired
}

export default Pager
