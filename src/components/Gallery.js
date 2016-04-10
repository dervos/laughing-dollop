import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class Gallery extends Component {

  render() {
    const { gallery, owner } = this.props
    const { custom_path, description } = gallery
    const { username } = owner

    return (
      <div className="header">
        <h3>
          <Link to={`/${username}/${custom_path}`}>
            {custom_path}
          </Link>
          {' by '}
          <Link to={`/${username}`}>
            {username}
          </Link>
        </h3>
        {description &&
          <p>{description}</p>
          }
        </div>
    )
  }
}

Gallery.propTypes = {
  gallery: PropTypes.shape({
    custom_path: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  owner: PropTypes.shape({
    username: PropTypes.string
  })
}
