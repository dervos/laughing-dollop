import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import { loadUser } from '../actions/user'
import SideMenu from './SideMenu'



function loadData(props) {
  props.loadUser(props.username)
}
class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.username!== this.props.username) {
      loadData(nextProps)
    }
  }
  handleChange(nextValue) {
    browserHistory.push(`/${nextValue}`)
  }


  render() {
    const { children, inputValue } = this.props
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
  inputValue: PropTypes.string.isRequired,
  // Injected by React Router
  children: PropTypes.node,
  user: PropTypes.object
}


function mapStateToProps(state, ownProps) {
  const { entities: { user } } = state

  return {
    username: 'dervos',
    user,
    inputValue: ownProps.location.pathname.substring(1)
  }
}

export default connect(mapStateToProps, {
  loadUser
})(App)
