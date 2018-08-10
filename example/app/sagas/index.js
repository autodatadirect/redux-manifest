import sagaMiddleware from '../middleware'
import { delay } from 'redux-saga'
import { put, takeLatest, takeEvery } from 'redux-saga/effects'
import { setPage, setError, setCount, actionTypes as types } from 'redux-manifest'
import service, { count } from '../services/manifest'

function * sagaRefresh () {
  yield takeLatest(types.REFRESH_DATA, sagaDataService)
}

function * sagaRefreshCount (action) {
  yield takeEvery(types.REFRESH_COUNT, sagaCountService)
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
  try {
    yield delay(5000)
    yield put(setCount(action.manifestName, count))
  } catch (err) {
    yield put(setError(action.manifestName, err.message))
  }
}

export default function runSagas () {
  sagaMiddleware.run(sagaRefresh)
  sagaMiddleware.run(sagaRefreshCount)
}
