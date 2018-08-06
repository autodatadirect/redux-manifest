import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { default as sagaMiddleware } from './middleware'
import reducer from './reducers'

const logger = createLogger({
  collapsed: true,
  diff: true
})

const configureStore = () => {
  const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware, logger)
  )

  window.store = store

  return store
}

const store = configureStore()

export default store
