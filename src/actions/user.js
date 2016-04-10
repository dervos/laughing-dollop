import { USER } from '../constants'
import api from '../helpers'

const fetchUser = username => ({
  type: USER,
  payload: api.get(`users/show`, {
    params: {
      username,
      consumer_key: 'GvEAXk6cHDuELGqcaV38N2w7LjBTgcha8oVn8zwY'
    }
  })
})

export function loadUser(username) {
  return (dispatch, getState) => {
    const user = getState().entities.user[username]
    if (user && user.username === username ) {
      return null
    }
    return dispatch(fetchUser(username))
  }
}
