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

const LastButton = ({currentPage, loadingCount, loadingData, totalPages, changePage}) => {
  if (isLastPage(currentPage, totalPages) || loadingCount) return null
  return (
    <PagerButton loading={loadingData} className={'last'} page={totalPages - 1} currentPage={currentPage} changePage={changePage}>
      {'Last'}
    </PagerButton>
  )
}

const buildNumberPageButton = n =>
  <PagerButton loading={n.loading} key={n.page} page={n.page} currentPage={n.currentPage} changePage={n.changePage}>
    {n.page + 1}
  </PagerButton>

const Pager = ({changePage, filter, count, loadingCount, loadingData, numberedPageButtons}) => {
  const currentPage = filter.page
  const totalPages = pagerLogic.determineTotalPages(filter.pageSize, count)
  if (!loadingCount && count < 1) return null
  return (
    <div className='manifest-pager btn-group' role='group' aria-label='pager'>
      <FirstButton loading={loadingData} changePage={changePage} currentPage={currentPage} />
      <PreviousButton loading={loadingData} changePage={changePage} currentPage={currentPage} />
      {numberedPageButtons.map(buildNumberPageButton)}
      <NextButton loading={loadingData} changePage={changePage} currentPage={currentPage} totalPages={totalPages} />
      <LastButton loadingCount={loadingCount} loadingData={loadingData} changePage={changePage} currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}

Pager.propTypes = {
  name: PropTypes.string.isRequired,
  loadingCount: PropTypes.bool.isRequired,
  loadingData: PropTypes.bool.isRequired,
  changePage: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  numberedPageButtons: PropTypes.array.isRequired
}

export default Pager
