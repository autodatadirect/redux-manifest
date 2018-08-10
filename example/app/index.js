import 'babel-core/register'
import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import startSagas from './sagas'
import ManifestWrapper from './component/ManifestWrapper'

import 'redux-manifest/styles.css'

startSagas()

ReactDOM.render((
  <Provider store={store}>
    <ManifestWrapper />
  </Provider>
), document.getElementById('app'))
