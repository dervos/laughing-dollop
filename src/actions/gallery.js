import { GALLERY, GALLERIES, GALLERY_PHOTOS } from '../constants'
import { get } from '../helpers'

const fetchGallery = (id, path) => ({
  type: GALLERY,
  payload:  get(`users/${id}/galleries/${path}`)
})

export function loadGallery( id , path, fullPath ){
  return (dispatch, getState) => {
    return dispatch(fetchGallery(id, path))
  }
}

const fetchGalleryItems = (id, path, fullPath ) => ({
  type: GALLERY_PHOTOS,
  payload: get(`users/${id}/galleries/${path}/items`),
  meta: { fullPath }
})

export function loadGalleryItems( id, path, fullPath ) {
  return (dispatch, getState) => {
    return dispatch(fetchGalleryItems(id, path, fullPath))
  }
}

const fetchOwnedGalleries = (id, username) => ({
  type: GALLERIES,
  payload: get(`users/${id}/galleries`),
  meta: {username}
})

export function loadOwnedGalleries(id, username) {
  return (dispatch, getState) => {
    const galleries = getState().pagination.galleriesOfUser[username]
    if (galleries) {
      return null
    }
    return dispatch(fetchOwnedGalleries(id, username))
  }
}


