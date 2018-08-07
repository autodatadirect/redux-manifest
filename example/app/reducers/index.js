import { combineReducers } from 'redux'
import manifestReducer from 'redux-manifest/reducer'

const rootReducer = combineReducers({
  manifest: manifestReducer
})

export default rootReducer
