import { Schema, arrayOf, normalize } from 'normalizr'

export const _PENDING =  '_PENDING'
export const _FULFILLED = '_FULFILLED'
export const _REJECTED = '_REJECTED'

export const USER = 'USER'
export const GALLERY = 'GALLERY'
export const PHOTO = 'PHOTO'
export const GALLERIES = 'GALLERIES'
export const GALLERY_PHOTOS= 'GALLERY_PHOTOS'


//const userSchema = new Schema('users', {
//  idAttribute: 'userId'
//})
//
//const gallerySchema = new Schema('galleries', {
//  idAttribute: 'galleryId'
//})
//
//const photoSchema = new Schema('photos', {
//  idAttribute: 'photoId'
//})
//
//gallerySchema.define({
//  owner: userSchema
//})
//
//photoSchema.define({
//  owner: userSchema
//})
//
//// Schemas for Github API responses.
//const Resources = {
//  USER: userSchema,
//  USER_ARRAY: arrayOf(userSchema),
//  GALLERY: gallerySchema,
//  GALLERY_ARRAY: arrayOf(gallerySchema),
//  PHOTO: photoSchema,
//  PHOTO_ARRAY: arrayOf(photoSchema)
//}
//
//

const APIHOST = 'https://api.500px.com/v1/'
