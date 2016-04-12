import React, { Component, PropTypes } from 'react'
import SideMenu from './SideMenu'



class App extends Component {

  render() {
    const { children } = this.props
    return (
      <div id="layout">
        <a href="#menu" id="menuLink" class="menu-link">
          <span></span>
        </a>
        <SideMenu />
        <div id="main">
          {children}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  // Injected by React Redux
  // Injected by React Router
  children: PropTypes.node,
}


export default App
