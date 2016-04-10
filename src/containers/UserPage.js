import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadUser, loadGalleryItems, loadOwnedGalleries } from '../actions'
import User from '../components/User'
import Gallery from '../components/Gallery'
import List from '../components/List'
import zip from 'lodash/zip'
import { fromJS } from 'immutable'

function loadData(props) {
  const { user_id } = props
  props.loadUser(user_id)
  props.loadOwnedGalleries(user_id)
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
    if (nextProps.user_id !== this.props.user_id) {
      loadData(nextProps)
    }
  }

  handleLoadMoreClick() {
    this.props.loadOwnedGalleries(this.props.user_id)
  }

  renderGallery([ gallery, user]) {
    return (
      <Gallery gallery={gallery}
            owner={user}
            key={gallery} />
    )
  }

  render() {
    const { user, user_id } = this.props
    if (!user) {
      return <h1><i>Loading {user.username}’s profile...</i></h1>
    }

    const { ownedGalleries, galleryItems, galleryPagination } = this.props
    return (
      <div>
        <User user={user} />
        <hr />
        <List renderItem={this.renderGallery}
              items={zip(ownedGalleries, galleryItems)}
              onLoadMoreClick={this.handleLoadMoreClick}
              loadingLabel={`Loading ${user.username}’s galleries...`}
              {...galleryPagination} />
      </div>
    )
  }
}

UserPage.propTypes = {
  user_id: PropTypes.string.isRequired,
  user: PropTypes.object,
  galleryPagination: PropTypes.object,
  ownedGalleries: PropTypes.array.isRequired,
  galleryItems: PropTypes.array.isRequired,
  loadUser: PropTypes.func.isRequired,
  loadOwnedGalleries: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const { user_id } = ownProps.params


  const pagination = state.get('pagination').toJS()
  const entities = state.get('entities').toJS()
  const user = entities.user
  const galleries = entities.galleries
  const galleriesOfUser  = pagination.galleriesOfUser
  const galleryPagination = galleriesOfUser['GALLERIES_FULFILLED'] || { ids: [] }
  const ownedGalleries = galleryPagination.ids.map(gallery => galleries[id])
  ownedGalleries.map(gallery => loadGalleryItems(user_id, galleryId))

  return {
    user_id,
    ownedGalleries,
    galleryItems,
    galleryPagination,
    user
  }
}

export default connect(mapStateToProps, {
  loadUser,
  loadOwnedGalleries,
  loadGalleryItems
})(UserPage)
