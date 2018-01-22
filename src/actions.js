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

export const setData = (manifestName, data, count) => {
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
  return {
    type: types.REFRESH_DATA,
    manifestName,
    filter: cleanFilter(filter)
  }
}
