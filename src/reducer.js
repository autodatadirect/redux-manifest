import * as types from './constants/actionTypes'
import getInMemoryPage from './util/getInMemoryPage'

export const initialState = {
  count: 0,
  data: [],
  loadingCount: true,
  loadingData: true,
  focused: null,
  error: '',
  filter: {
    page: 0,
    pageSize: 10,
    sorts: []
  }
}

const isSet = n => n !== null && n !== undefined

const coalesce = (a, b) => {
  if (isSet(a)) return a
  return b
}

const reduceSetError = (state, action) => console.log('reduce set error') || ({
  ...state,
  loadingCount: false,
  loadingData: false,
  error: action.message
})

const reduceRefreshData = (s, a) => s.inMemoryData ? inMemoryReduceRefreshData(s, a) : remoteReduceRefreshData(s, a)

const inMemoryReduceRefreshData = (state, action) => {
  const page = getInMemoryPage(state.inMemoryData, action.filter || initialState.filter)
  return {
    ...state,
    loadingCount: false,
    loadingData: false,
    error: '',
    data: page.data,
    count: page.count,
    filter: {...state.filter, ...action.filter}
  }
}

const remoteReduceRefreshData = (state, action) => ({
  ...state,
  loadingCount: state.loadingCount || action.countNeeded,
  loadingData: true,
  error: '',
  filter: {...state.filter, ...action.filter},
  focused: null
})

const reduceSetCount = (state, action) => ({
  ...state,
  loadingCount: false,
  error: '',
  count: action.count || 0
})

const reduceSetData = (state, action) => ({
  ...state,
  loadingCount: state.loadingCount && !isSet(action.count),
  loadingData: false,
  data: action.data,
  error: '',
  count: coalesce(action.count, state.count) || 0
})

const reduceSetInMemoryData = (state, action) => reduceRefreshData({
  ...state,
  inMemoryData: action.data
}, action)

const reduceFocusRow = (state, action) => ({
  ...state,
  focused: action.id
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REFRESH_DATA: return reduceRefreshData(state, action)
    case types.SET_COUNT: return reduceSetCount(state, action)
    case types.SET_DATA: return reduceSetData(state, action)
    case types.SET_ERROR: return reduceSetError(state, action)
    case types.FOCUS_ROW: return reduceFocusRow(state, action)
    case types.SET_IN_MEMORY_DATA: return reduceSetInMemoryData(state, action)
    default: return state
  }
}

export default (state = {}, action) => {
  switch (action.type) {
    case types.REFRESH_DATA:
    case types.SET_COUNT:
    case types.SET_DATA:
    case types.SET_ERROR:
    case types.FOCUS_ROW:
    case types.SET_IN_MEMORY_DATA:
      return {
        ...state,
        [action.manifestName]: reducer(state[action.manifestName], action)
      }
    case types.DESTROY:
      const clonedState = {...state}
      delete clonedState[action.manifestName]
      return clonedState
    default:
      return state
  }
}
