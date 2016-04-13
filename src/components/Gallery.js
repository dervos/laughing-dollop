import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class Gallery extends Component {

  render() {

    return (
      <div className="header">
        <h2>
          <Link to={`/${username}/${custom_path}`}>
            {custom_path}
          </Link>
          {' by '}
          <Link to={`/${username}`}>
            {username}
          </Link>
        </h2>
        {description &&
          <p>{description}</p>
          }
        </div>
    )
  }
}

Gallery.propTypes = {
}
