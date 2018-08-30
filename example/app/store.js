import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { default as sagaMiddleware } from './middleware'
import invariant from 'redux-immutable-state-invariant'
import reducer from './reducers'

const logger = createLogger({
  collapsed: true,
  diff: true
})

const configureStore = () => {
  const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware, logger, invariant())
  )

  window.store = store

  return store
}

const store = configureStore()

export default store
