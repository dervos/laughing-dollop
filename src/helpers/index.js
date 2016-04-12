import axios from 'axios'
import secrets from '../secret.js'


const instance = axios.create({
  baseURL:  'https://api.500px.com/v1/'
})

export function get(url, parameters) {
  return instance.get(url, {
    params: {
      ...parameters,
      consumer_key: secrets.consumer_key,
    }
  })
}

