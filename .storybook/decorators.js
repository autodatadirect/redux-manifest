import React from 'react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import manifestReducer from '../src/reducer'
import * as actions from '../src/actions'

const reducer = combineReducers({
  manifest: manifestReducer
})

const data = [{
  id: 1,
  col1: 'row1a',
  col2: 'row1b',
  colDate: '2015-07-12'
},{
  id: 2,
  col1: 'row2'
},{
  id: 3,
  col1: 'row3',
  colDate: '2018-01-01'
},{
  id: 4,
  colDate: '2016-03-21'
}]

const store = createStore(reducer)
store.dispatch(actions.setPage('testmanifest', data, 12312))

export const withRedux = story => <Provider store={store}>{story()}</Provider>