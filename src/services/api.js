import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import 'isomorphic-fetch'

// Extracts the next page URL from Github API response.
function getNextPageUrl(response) {
  const link = response.headers.get('link')
  if (!link) {
    return null
  }

  const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1)
  if (!nextLink) {
    return null
  }

  return nextLink.split(';')[0].slice(1, -1)
}

const API_ROOT = 'https://api.500px.com/v1/'

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, schema) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  return fetch(fullUrl)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      const camelizedJson = camelizeKeys(json)
      const nextPageUrl = getNextPageUrl(response)

      return Object.assign({},
        normalize(camelizedJson, schema),
        { nextPageUrl }
      )
    })
    .then(
      response => ({response}),
      error => ({error: error.message || 'Something bad happened'})
    )

}

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where gallerys and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/gaearon/normalizr

// Schemas for Github API responses.
const userSchema = new Schema('users', {
  idAttribute: 'userId'
})

const gallerySchema = new Schema('galleries', {
  idAttribute: 'customPath'
})

gallerySchema.define({
  owner: userSchema
})

const userSchemaArray = arrayOf(userSchema)
const gallerySchemaArray = arrayOf(gallerySchema)

// api services
export const fetchUser = userId => callApi(`users/${userId}`, userSchema)
export const fetchGallery = customPath => callApi(`users/${userId}/galleries/${customPath}`, gallerySchema)
export const fetchStarred = url => callApi(url, gallerySchemaArray)
export const fetchStargazers = url => callApi(url, userSchemaArray)
