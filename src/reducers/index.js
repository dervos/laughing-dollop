import { GALLERIES, GALLERY_PHOTOS } from '../constants'
import merge from 'lodash/merge'
import paginate from './paginate'
import { routerReducer as router } from 'react-router-redux'
import { combineReducers } from 'redux'


function entities(state = {gallery: {}, user: {}, photos: [] }, action) {
  if (action.payload && action.payload.data) {
    return merge({}, state, action.payload.data)
  }
  return state
}

const pagination = combineReducers({
  galleriesOfUser: paginate({
    mapActionToKey: action => action.meta.username,
      types: [
        `${GALLERIES}_PENDING`,
        `${GALLERIES}_FULFILLED`,
        `${GALLERIES}_REJECTED`
      ]
  }),
  galleryItemsOfGallery: paginate({
    mapActionToKey: action => action.meta.fullPath,
      types: [
        `${GALLERY_PHOTOS}_PENDING`,
        `${GALLERY_PHOTOS}_FULFILLED`,
        `${GALLERY_PHOTOS}_REJECTED`
      ]
  })
})


export default combineReducers({
  entities,
  pagination,
  router
})

