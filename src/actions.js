import * as types from './constants/actionTypes'
import isArray from 'lodash/isArray'

const err = message => new Error('Redux Manifest Action: ' + message)

export const setError = (manifestName, message) => {
  if (!manifestName) throw err('manifest name must be set')
  return {
    type: types.SET_ERROR,
    manifestName,
    message
  }
}

export const setPage = (manifestName, data, count) => {
  if (!manifestName) throw err('manifest name must be set')
  if (!isArray(data)) throw err('data must be an array')
  return {
    type: types.SET_DATA,
    manifestName,
    data,
    count
  }
}

export const setCount = (manifestName, count) => {
  if (!manifestName) throw err('manifest name must be set')
  return {
    type: types.SET_COUNT,
    manifestName,
    count
  }
}

export const focusRow = (manifestName, id) => {
  if (!manifestName) throw err('manifest name must be set')
  return {
    type: types.FOCUS_ROW,
    manifestName,
    id
  }
}

export const setInMemoryData = (manifestName, data) => {
  if (!manifestName) throw err('manifest name must be set')
  return {
    type: types.SET_IN_MEMORY_DATA,
    manifestName,
    data
  }
}

const toNumber = s => +s || 0

const cleanFilter = filterIn => {
  const filter = {...filterIn}
  if (filter.count) filter.count = toNumber(filter.count)
  if (filter.page) filter.page = toNumber(filter.page)
  if (filter.pageSize) filter.pageSize = toNumber(filter.pageSize)
  return filter
}

export const refreshData = (manifestName, filter) => {
  if (!manifestName) throw err('manifest name must be set')
  if (!filter) throw err('filter must be set')
  filter = cleanFilter(filter)
  return {
    type: types.REFRESH_DATA,
    countNeeded: !filter.page,
    manifestName,
    filter
  }
}
