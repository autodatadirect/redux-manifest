import * as types from './constants/actionTypes'

const initialState = {
  count: null,
  data: [],
  loadingCount: false,
  loadingData: false,
  filter: {
    page: 0,
    pageSize: 10,
    sort: []
  }
}

const isSet = n => n !== null && n !== undefined

const coalesce = (a, b) => {
  if (isSet(a)) return a
  return b
}

const reduceRefreshData = (state, action) => ({
  ...state,
  loadingCount: true,
  loadingData: true,
  filter: {...state.filter, ...action.filter}
})

const reduceSetCount = (state, action) => ({
  ...state,
  loadingCount: false,
  count: action.count
})

const reduceSetData = (state, action) => ({
  ...state,
  loadingCount: state.loadingCount && !isSet(action.count),
  loadingData: false,
  data: action.data,
  count: coalesce(action.count, state.count)
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REFRESH_DATA: return reduceRefreshData(state, action)
    case types.SET_COUNT: return reduceSetCount(state, action)
    case types.SET_DATA: return reduceSetData(state, action)
    default: return state
  }
}

export default (state = {}, action) => {
  switch (action.type) {
    case types.REFRESH_DATA:
    case types.SET_COUNT:
    case types.SET_DATA:
      return {
        ...state,
        [action.manifestName]: reducer(state[action.manifestName], action)
      }
    default:
      return state
  }
}
