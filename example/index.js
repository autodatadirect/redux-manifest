import 'babel-core/register'
import 'babel-polyfill'

import React from 'react'
import reactDom from 'react-dom'

import { combineReducers, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { put, takeLatest } from 'redux-saga/effects'

import manifestReducer from 'redux-manifest/reducer'
import * as types from 'redux-manifest/constants/actionTypes'
import { Manifest, CellEpochDate, setPage, setError } from 'redux-manifest'
import service from './service'

/*
 * Redux
 */

const reducer = combineReducers({
  manifest: manifestReducer
})

const loggingReducer = (s, a) => console.log('ACTION: ', a) || reducer(s, a)

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  loggingReducer,
  applyMiddleware(sagaMiddleware)
)

window.store = store

/*
 * Saga
 */

function * sagaService (action) {
  try {
    const data = yield service(action.filter)
    yield put(setPage(action.manifestName, data.data, data.count))
  } catch (err) {
    yield put(setError(action.manifestName, err.message))
  }
}

function * sagaRefresh () {
  yield takeLatest(types.REFRESH_DATA, sagaService)
}

sagaMiddleware.run(sagaRefresh)

/*
 * Redux Manifest
 */

const definition = [{
  id: 'id',
  label: 'ID',
  sortable: true
}, {
  id: 'date',
  label: 'Date',
  sortable: true,
  cellComponent: CellEpochDate
}, {
  id: 'firstName',
  label: 'First Name',
  sortable: true
}, {
  id: 'lastName',
  label: 'Last Name',
  sortable: true
}, {
  id: 'age',
  label: 'Age',
  sortable: true
}, {
  id: 'phone',
  label: 'Phone'
}, {
  id: 'address',
  label: 'Address'
}]

/*
 * React + Redux
 */

reactDom.render(
  <Provider store={store}>
    <Manifest name='testManifest' definition={definition} />
  </Provider>,
  document.getElementById('app')
)
