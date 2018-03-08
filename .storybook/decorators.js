import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from '../src/reducer'
import * as actions from '../src/actions'

const store = createStore(reducer)
store.dispatch(actions.refreshData('testmanifest', {page: 0, pageSize: 10}))

console.log('state', store.getState())

export const withRedux = story => <Provider store={store}>{story()}</Provider>