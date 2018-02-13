import 'babel-core/register'
import 'babel-polyfill'

import React from 'react'
import reactDom from 'react-dom'

import { combineReducers, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { default as createSagaMiddleware, delay } from 'redux-saga'
import { put, takeLatest, takeEvery } from 'redux-saga/effects'

import manifestReducer from 'redux-manifest/reducer'
import 'redux-manifest/styles.css'
import { Manifest, CellEpochDate, setPage, setError, setCount, actionTypes as types } from 'redux-manifest'
import service, { count } from './service'
import { createLogger } from 'redux-logger'

/*
 * Redux
 */

const reducer = combineReducers({
  manifest: manifestReducer
})

const logger = createLogger({
  collapsed: true,
  diff: true
})

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware, logger)
)

window.store = store

/*
 * Saga
 */

function * sagaRefresh () {
  yield takeLatest(types.REFRESH_DATA, sagaDataService)
}

function * sagaRefreshCount (action) {
  yield takeEvery(types.REFRESH_DATA, sagaCountService)
}

function * sagaDataService (action) {
  try {
    const data = yield service(action.filter)
    yield put(setPage(action.manifestName, data.data))
  } catch (err) {
    yield put(setError(action.manifestName, err.message))
  }
}

function * sagaCountService (action) {
  if (!action.countNeeded) return
  try {
    yield delay(5000)
    yield put(setCount(action.manifestName, count))
  } catch (err) {
    yield put(setError(action.manifestName, err.message))
  }
}

sagaMiddleware.run(sagaRefresh)
sagaMiddleware.run(sagaRefreshCount)

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

const onRowClick = row => console.log('Row was clicked:', row)
/*
 * React + Redux
 */

reactDom.render(
  <Provider store={store}>
    <Manifest name='testManifest' definition={definition} onRowClick={onRowClick} />
  </Provider>,
  document.getElementById('app')
)
