import React from 'react'
import PropTypes from 'prop-types'

const PagerSizer = ({filter, changePageSize, loading}) => (
  <select
    className='row-limit form-control form'
    value={filter.limit}
    onChange={changePageSize}
    disabled={loading}>
    <option value={10}>{'Show 10 entries'}</option>
    <option value={20}>{'Show 20 entries'}</option>
    <option value={50}>{'Show 50 entries'}</option>
    <option value={100}>{'Show 100 entries'}</option>
    <option value={200}>{'Show 200 entries'}</option>
  </select>
)

PagerSizer.propTypes = {
  name: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  changePageSize: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired
}

export default PagerSizer
