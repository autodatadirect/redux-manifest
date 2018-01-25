import React from 'react'
import PropTypes from 'prop-types'
import * as pagerLogic from './pagerLogic'

import PagerButton from '../PagerButton'

const isFirstPage = currentPage => currentPage < 1
const isLastPage = (currentPage, totalPages) => currentPage === totalPages - 1

const FirstButton = ({currentPage, loading, changePage}) => {
  if (isFirstPage(currentPage)) return null
  return (
    <PagerButton loading={loading} className={'first'} page={0} currentPage={currentPage} changePage={changePage}>
      {'First'}
    </PagerButton>
  )
}

const PreviousButton = ({currentPage, loading, changePage}) => {
  if (isFirstPage(currentPage)) return null
  return (
    <PagerButton loading={loading} className={'previous'} page={currentPage - 1} currentPage={currentPage} changePage={changePage}>
      {'<'}
    </PagerButton>
  )
}

const NextButton = ({currentPage, loading, totalPages, changePage}) => {
  if (isLastPage(currentPage, totalPages)) return null
  return (
    <PagerButton loading={loading} className={'next'} page={currentPage + 1} currentPage={currentPage} changePage={changePage}>
      {'>'}
    </PagerButton>
  )
}

const LastButton = ({currentPage, loading, totalPages, changePage}) => {
  if (isLastPage(currentPage, totalPages)) return null
  return (
    <PagerButton loading={loading} className={'last'} page={totalPages - 1} currentPage={currentPage} changePage={changePage}>
      {'Last'}
    </PagerButton>
  )
}

const Pager = ({changePage, filter, count, loading, mapNumberedPagerButtons}) => {
  const currentPage = filter.page
  const totalPages = pagerLogic.determineTotalPages(filter.pageSize, count)

  return (
    <div className='manifest-pager btn-group' role='group' aria-label='pager'>
      <FirstButton loading={loading} changePage={changePage} currentPage={currentPage} />
      <PreviousButton loading={loading} changePage={changePage} currentPage={currentPage} />
      {pagerLogic.determinePages(currentPage, totalPages).map(mapNumberedPagerButtons)}
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
  count: PropTypes.number.isRequired,
  mapNumberedPagerButtons: PropTypes.func.isRequired
}

export default Pager
