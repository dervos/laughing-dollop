import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'redux'

import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import createRoutes from 'routes'
import configureStore from 'store/configureStore'

// Grab the state from a global injected into
// server-generated HTML
const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store);

export const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
)
