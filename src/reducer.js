import * as types from './constants/actionTypes'

export const initialState = {
  count: 0,
  data: [],
  loadingCount: false,
  loadingData: false,
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

const reduceRefreshData = (state, action) => ({
  ...state,
  loadingCount: true,
  loadingData: true,
  error: '',
  filter: {...state.filter, ...action.filter}
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REFRESH_DATA: return reduceRefreshData(state, action)
    case types.SET_COUNT: return reduceSetCount(state, action)
    case types.SET_DATA: return reduceSetData(state, action)
    case types.SET_ERROR: return reduceSetError(state, action)
    default: return state
  }
}

export default (state = {}, action) => {
  switch (action.type) {
    case types.REFRESH_DATA:
    case types.SET_COUNT:
    case types.SET_DATA:
    case types.SET_ERROR:
      return {
        ...state,
        [action.manifestName]: reducer(state[action.manifestName], action)
      }
    default:
      return state
  }
}
