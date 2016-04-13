import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { ReduxAsyncConnect } from 'redux-async-connect'
import '../styles/core.scss'


export default class Root extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.element.isRequired,
    store: PropTypes.object.isRequired
  };

  get content () {
    return (
      <Router render={(props) => <ReduxAsyncConnect {...props}/>} history={this.props.history}>
        {this.props.routes}
      </Router>
    )
  }

  get devTools () {
    if (__DEBUG__) {
      if (__DEBUG_NEW_WINDOW__) {
        if (!window.devToolsExtension) {
          require('../helpers/createDevToolsWindow').default(this.props.store)
        } else {
          window.devToolsExtension.open()
        }
      } else if (!window.devToolsExtension) {
        const DevTools = require('containers/DevTools').default
        return <DevTools />
      }
    }
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <div>
          {this.content}
          {this.devTools}
        </div>
      </Provider>
    )
  }
}
