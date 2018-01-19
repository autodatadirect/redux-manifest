import 'babel-core/register'
import 'babel-polyfill'

import React from 'react'
import reactDom from 'react-dom'

import { combineReducers, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { put, takeLatest } from 'redux-saga/effects'

import manifestReducer from 'redux-manifest/reducer'
import * as actions from 'redux-manifest/actions'
import * as types from 'redux-manifest/constants/actionTypes'
import Manifest from 'redux-manifest/containers/Manifest'
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
  const data = yield service(action.filter)
  yield put(actions.setData(action.manifestName, data.data, data.count))
}

function * sagaRefresh () {
  yield takeLatest(types.REFRESH_DATA, sagaService)
}

sagaMiddleware.run(sagaRefresh)

/*
 * Redux Manifest
 */

const definition = [{
  key: 'id',
  label: 'ID'
}, {
  key: 'date',
  label: 'Date'
}, {
  key: 'firstName',
  label: 'First Name'
}, {
  key: 'lastName',
  label: 'Last Name'
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
