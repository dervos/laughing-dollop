
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import createLogger from 'redux-logger'
import sagaMiddleware from 'redux-saga'
import { routerMiddleware, routerReducer as router } from 'react-router-redux'

import reducers from 'reducers';
import rootSaga from 'sagas'

export const sagaMiddleware = createSagaMiddleware(rootSaga)

export default function configureStore (initialState = {}, history) {
  const rootReducer = combineReducers({
    ...reducers,
    router
  })

  // Compose final middleware and use devtools in debug environment
    let middleware = applyMiddleware(sagaMiddleware, routerMiddleware(history), createLogger())
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
