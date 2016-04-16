import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { resetErrorMessage } from '../actions'
import Explore from '../components/Explore'
import rebass from 'rebass'

import mono from '../mono'
import { config, Toolbar, NavItem, Space } from 'rebass'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleDismissClick = this.handleDismissClick.bind(this)
  }


  handleDismissClick(e) {
    this.props.resetErrorMessage()
    e.preventDefault()
  }

  handleChange(nextValue) {
    browserHistory.push(`/${nextValue}`)
  }

  getChildContext () {
    return {
      rebass: mono
    }
  }

  renderErrorMessage() {
    const {
      errorMessage
    } = this.props

    if(!errorMessage) {
      return null
    }

    return(
           <p style={{
          backgroundColor: '#e99',
          padding: 10
           }} >
          <b> {errorMessage} </b>
        {' '}
      ( <a href = "#"
        onClick = {
          this.handleDismissClick} > Dismiss </a>) </p>)
    }
    render() {
      const {
        children,
        inputValue
      } = this.props
      return(
             <div>
               <Toolbar>
                 <NavItem is="a">
                   Toolbar
                 </NavItem>
                 <NavItem is="a">
                   NavItem
                 </NavItem>
                 <Space
                   auto={true}
                   x={1}
                 />
                 <NavItem is="a">
                   NavItem
                 </NavItem>
               </Toolbar>
               <Explore value = {inputValue}

        onChange = {this.handleChange}
      />
      <hr /> {this.renderErrorMessage()} {children} < /div>)
    }
  }


  App.childContextTypes = {
    rebass: React.PropTypes.object
  }

  App.propTypes = {
    // Injected by React Redux
    errorMessage: PropTypes.string,
    inputValue: PropTypes.string.isRequired,
    resetErrorMessage: PropTypes.func.isRequired,
    // Injected by React Router
    children: PropTypes.node
  }

  function mapStateToProps(state, ownProps) {
    return {
      errorMessage: state.errorMessage,
      inputValue: ownProps.location.pathname.substring(1)
    }
  }
  export default connect(mapStateToProps, {
    resetErrorMessage
  })(App)
