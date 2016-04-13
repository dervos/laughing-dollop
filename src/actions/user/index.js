import flow from 'lodash/lib/flow'
import map from 'lodash/lib/map'
import filter from 'lodash/lib/filter'
import { arrayOf, normalize } from 'normalizr'
import userSchema from 'constants/schemas'
import * as actionTypes from 'constants/actionTypes'
import * as requestTypes from 'constants/requestTypes'
import * as paginateLinkTypes from 'constants/paginateLinkTypes'
import { setRequestInProcess } from 'actions/request'
import { setPaginateLink } from 'actions/paginate'
import { mergeEntities } from 'actions/entities'
import { apiUrl, addAccessTokenWith, getLazyLoadingUrl } from 'services/api'

export function mergeGalleries(galleries) {
  return {
    type: actionTypes.MERGE_GALLERIES,
    galleries
  }
}

export const fetchGalleries = (user, nextHref, ignoreInProgress) => (dispatch, getState) => {
  let requestType = requestTypes.GALLERIES
  let url = getLazyLoadingUrl(user, nextHref, '?limit=20&offset=0')
  let requestInProcess = getState().request[requestType]

  if (requestInProcess && !ignoreInProgress) { return; }

  dispatch(setRequestInProcess(true, requestType))

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const normalized = normalize(data.collection, arrayOf(userSchema))
      dispatch(mergeEntities(normalized.entities))
      dispatch(mergeFollowings(normalized.result))
      dispatch(setPaginateLink(data.next_href, paginateLinkTypes.FOLLOWINGS))
      dispatch(setRequestInProcess(false, requestType))
    })
}

export function mergePhotosByGallery(galleries) {
  return {
    type: actionTypes.MERGE_GALLERY_PHOTOS,
    galleries
  }
}

export const fetchPhotosByGallery = (user, nextHref) => (dispatch, getState) => {
  let requestType = requestTypes.ACTIVITIES
  let url = getLazyLoadingUrl(user, nextHref, 'activities?limit=20&offset=0')
  let requestInProcess = getState().request[requestType]

  if (requestInProcess) { return; }

  dispatch(setRequestInProcess(true, requestType))

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const mapAndFiltered = flow(
        filter(isTrack),
        map('origin')
      )(data.collection);
      const normalized = normalize(mapAndFiltered, arrayOf(trackSchema));
      dispatch(mergeEntities(normalized.entities));
      dispatch(mergeActivities(normalized.result));
      dispatch(setPaginateLink(data.next_href, paginateLinkTypes.ACTIVITIES));
      dispatch(setRequestInProcess(false, requestType));
    });
}

