import * as types from './constants/actionTypes'
import isArray from 'lodash/isArray'

const err = message => new Error('Redux Manifest Action: ' + message)

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

export const refreshData = (manifestName, filter) => {
  if (!manifestName) throw err('manifest name must be set')
  if (!filter) throw err('filter must be set')
  return {
    type: types.REFRESH_DATA,
    manifestName,
    filter
  }
}
