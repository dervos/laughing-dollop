
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { reducer as reduxAsyncConnect } from 'redux-async-connect'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { routerMiddleware, routerReducer as router } from 'react-router-redux'

import reducers from 'reducers/index';

export default function configureStore (initialState = {}, history) {
  const rootReducer = combineReducers({
    ...reducers,
    reduxAsyncConnect,
    router
  })

  // Compose final middleware and use devtools in debug environment
  let middleware = applyMiddleware(thunk, routerMiddleware(history), createLogger())
  if (__DEBUG__) {
    const devTools = window.devToolsExtension
      ? window.devToolsExtension()
      : require('containers/DevTools').default.instrument()
    middleware = compose(middleware, devTools)
  }

  // Create final store and subscribe router in debug env ie. for devtools
  const store = middleware(createStore)(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default

      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
