import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadUser } from '../actions/user'
import { loadOwnedGalleries } from '../actions/gallery'
import User from '../components/User'
import Gallery from '../components/Gallery'
import List from '../components/List'
import zip from 'lodash/zip'

function loadData(props) {
  const {user, username } = props
  if(user) {
    props.loadOwnedGalleries(user.id, username)
  } else {
    props.loadUser(username)
  }
}

class UserPage extends Component {
  constructor(props) {
    super(props)
    this.renderGallery = this.renderGallery.bind(this)
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this)
  }

  componentWillMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      loadData(nextProps)
    }
  }

  handleLoadMoreClick() {
    this.props.loadOwnedGalleries(user.id, this.props.username)
  }

  renderGallery(gallery) {
    return (
      <Gallery gallery={gallery}
            key={gallery.id} />
    )
  }

  render() {
    const { user, username } = this.props
    if (!user) {
      return <h1><i>Loading {username}’s profile...</i></h1>
    }

    const { ownedGalleries, galleryPagination } = this.props
    return (
      <div>
        <User user={user} />
        <hr />
        <List renderItem={this.renderGallery}
              items={ownedGalleries}
              onLoadMoreClick={this.handleLoadMoreClick}
              loadingLabel={`Loading ${user.username}’s galleries...`}
              {...galleryPagination} />
      </div>
    )
  }
}

UserPage.propTypes = {
  username: PropTypes.string.isRequired,
  user: PropTypes.object,
  galleryPagination: PropTypes.object,
  ownedGalleries: PropTypes.array.isRequired,
  loadUser: PropTypes.func.isRequired,
  loadOwnedGalleries: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const { username } = ownProps.params
  const {
    pagination: { galleriesOfUser },
    entities: { galleries, users }
  } = state

  const galleryPagination = galleriesOfUser[username] || { ids: [] }
  const ownedGalleries = galleryPagination.ids.map(id => users[id])

  return {
    username,
    user: users[username],
    ownedGalleries,
    galleryPagination,
  }
}

export default connect(mapStateToProps, {
  loadUser,
  loadOwnedGalleries
})(UserPage)
