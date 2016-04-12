import { USER, Schemas } from '../constants'
import { get } from '../helpers'

const fetchUser = username => ({
  type: USER,
  payload: get(`users/show`, {username}),
  meta: {schema: Schemas.USER}
})

export function loadUser(username) {
  return (dispatch, getState) => {
    const user = getState().entities.users[username]
    if (user && user.username === username ) {
      return null
    }
    return dispatch(fetchUser(username))
  }
}
