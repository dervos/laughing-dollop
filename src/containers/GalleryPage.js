import React, { Component, PropTypes } from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import { connect } from 'react-redux'
import { loadGallery, loadGalleryItems } from '../actions/gallery'
import { loadUser } from '../actions/user'
import Gallery from '../components/Gallery'
import Photo from '../components/Photo'
import List from '../components/List'

function loadData(props) {
  const { username, path } = props.params
  const { owner, fullPath } = props
  if(!owner) {
    props.loadUser(username)
  } else {
    props.loadGallery(owner.id, path, fullPath)
    props.loadGalleryItems(owner.id, path, fullPath)
  }
}

class GalleryPage extends Component {
  constructor(props) {
    super(props)
    this.renderPhoto = this.renderPhoto.bind(this)
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this)
  }

  componentWillMount() {
    loadData(this.props)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.path!== this.props.path) {
      loadData(nextProps)
    }
  }

  handleLoadMoreClick() {
    const { owner, path, fullPath } = this.props
    this.props.loadGalleryItems(owner.id, path, fullPath)
  }

  renderPhoto(photo) {

    return (
      <Photo
        key={photo.id}
        photo={photo}/>
    )
  }

  render() {
    const { gallery, owner, path} = this.props
    if (!gallery || !owner) {
      return <h1><i>Loading {path} details...</i></h1>
    }

    const { items, galleryItemsPagination} = this.props
    return (
      <div className="main">
        <div className="header">
          <Gallery
            gallery={gallery}
            owner={owner}
          />
        </div>
        <div className="content">
          <List
            renderItem={this.renderPhoto}
            items={items.map(item => item)}
            onLoadMoreClick={this.handleLoadMoreClick}
            loadingLabel={`Loading galleryItems of ${path}...`}
            {...galleryItemsPagination} />
        </div>
      </div>
    )
  }
}

GalleryPage.propTypes = {
  gallery: PropTypes.object,
  fullPath: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  owner: PropTypes.object.isRequired,
  galleryItemsPagination: PropTypes.object,
  loadGallery: PropTypes.func.isRequired,
  loadGalleryItems: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const { username, path } = ownProps.params
  const {
    pagination: { galleryItemsOfGallery },
    entities: { photos, gallery, user }
  } = state

  const fullPath = `${username}/${path}`
  const galleryItemsPagination = galleryItemsOfGallery[fullPath] || { ids: [] }
  const galleryItems = galleryItemsPagination.ids.map(id => users[id])

  return {
    gallery,
    items: photos,
    fullPath,
    username,
    path,
    owner: user,
    galleryItems,
    galleryItemsPagination
  }
}

export default connect(mapStateToProps, {
  loadGallery,
  loadGalleryItems,
  loadUser
})(GalleryPage)
