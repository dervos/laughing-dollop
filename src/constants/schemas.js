import { Schema, arrayOf } from 'normalizr'

let user = new Schema('users')

let gallery = new Schema('galleries')

let photo = new Schema('photos')


gallery.define({
  user
})


export const userSchema = user
export const gallerySchema = gallery
