import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class User extends Component {
  render() {
    const { username, userpic_url, fullname, id } = this.props.owner

    return (
      <div key={id} className="User animated fadeIn">
        <Link to={`/${username}/${id}`}>
          <img src={userpic_url} width="72" height="72" />
          <h3>
            {username} {fullname && <span>({fullname})</span>}
          </h3>
        </Link>
      </div>
    )
  }
}

User.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    userpic_url: PropTypes.string,
    fullname: PropTypes.string
  }).isRequired
}
