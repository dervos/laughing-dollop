import { GALLERIES, GALLERY_PHOTOS, normalizeResponse } from '../constants'
import merge from 'lodash/merge'
import paginate from './paginate'
import { routerReducer as router } from 'react-router-redux'
import { combineReducers } from 'redux'

import entities from './entities'

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


export default {
  entities,
  pagination,
  router
}

