import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class Photo extends Component {
  render() {
    const { user, id, images, description, title } = this.props.photo

    return (
      <div key={id} >
        <Link to={`/${user.username}/photo/${id}`}>
          <img className="pure-img-responsive" src={images[0].url}  />
          <h3>
            {title} {description && <span>({ description })</span>}
          </h3>
        </Link>
      </div>
    )
  }
}

Photo.propTypes = {
  id: PropTypes.number,
  description: PropTypes.string,
  title: PropTypes.string,
  images: PropTypes.array,
}

