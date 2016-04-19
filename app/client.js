import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from 'containers/Root'

const rootEl = document.getElementById('app');

render(
  <AppContainer component={Root} />,
  rootEl
)

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    render(
      <AppContainer component={require('./containers/Root').default} />,
      rootEl
    )
  })
}
