import api from '../helpers'
import { GALLERY, GALLERIES, GALLERY_PHOTOS } from '../constants'


const fetchGallery = (id, path) => ({
  type: GALLERY,
  payload:  api.get(`users/${id}/galleries/${path}`, {
    params: {
      consumer_key: 'GvEAXk6cHDuELGqcaV38N2w7LjBTgcha8oVn8zwY'
    }
  })
})

export function loadGallery( id , path, fullPath ){
  return (dispatch, getState) => {
    return dispatch(fetchGallery(id, path))
  }
}


const fetchGalleryItems = (id, path, fullPath ) => ({
  type: GALLERY_PHOTOS,
  payload: api.get(`users/${id}/galleries/${path}/items`, {
    params: {
      consumer_key: 'GvEAXk6cHDuELGqcaV38N2w7LjBTgcha8oVn8zwY'
    }
  }),
  meta: {fullPath}
})

export function loadGalleryItems( id, path, fullPath ) {
  return (dispatch, getState) => {
    return dispatch(fetchGalleryItems(id, path, fullPath))
  }
}


const fetchOwnedGalleries = (user_id, username) => ({
  type: GALLERIES,
  payload: api.get(`users/${user_id}/galleries`, {
    params: {
      consumer_key: 'GvEAXk6cHDuELGqcaV38N2w7LjBTgcha8oVn8zwY'
    }
  })
})

export function loadOwnedGalleries(user_id, fullPath) {
  return (dispatch, getState) => {
    const gallery = getState().entities.galleries[fullPath]
    if (gallery) {
      return null
    }
    return dispatch(fetchOwnedGalleries(user_id, fullPath))
  }
}


