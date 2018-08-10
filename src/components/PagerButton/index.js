import React from 'react'
import PropTypes from 'prop-types'

const PagerButton = ({page, loading, currentPage, changePage, children, className, loadingPage}) => {
  let buttonStyle = 'btn pager-button'
  if (className) buttonStyle += ' ' + className
  buttonStyle += (currentPage === page) ? ' btn-primary' : ' btn-default'
  buttonStyle += (loading && loadingPage === page) ? ' pager-button-loading' : ''
  return (
    <button data-page={page} className={buttonStyle} onClick={changePage} disabled={loading}>
      {children}
    </button>
  )
}

PagerButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  changePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  loadingPage: PropTypes.number
}

export default PagerButton
