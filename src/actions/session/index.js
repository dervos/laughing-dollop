import Cookies from 'js-cookie'
import { CONSUMER_KEY, OAUTH_TOKEN, REDIRECT_URI } from 'constants/authentication'
import * as actionTypes from 'constants/actionTypes'
import { apiUrl } from 'services/api'
import { changeLocation } from 'actions/location'
import { fetchGalleries } from 'actions/user'
import { user, gallery} from 'constants/pathnames'


const setSession = session => ({ type: actionTypes.SET_SESSION, session })
const setUser = user => ({ type: actionTypes.SET_USER, user })
const resetSession = () => ({ type: actionTypes.RESET_SESSION, null })

export const login = () => dispatch => {
  const consumerKey = CONSUMER_KEY
  const consumerSecret = CONSUMER_SECRET
  const redirectUri = REDIRECT_URI

  API.init({ consumerKey, redirectUri })

  dispatch(changeLocation(login))
  API.connect().then(session => {
    Cookies.set(OAUTH_TOKEN, session.oauthToken)
    dispatch(setSession(session))
    dispatch(fetchUser(session.oauthToken))
  })
}

export const logout = () => (dispatch) => {
  Cookies.remove(OAUTH_TOKEN);
  dispatch(changeLocation(browse));
  dispatch(resetSession());
}

const fetchUser = (accessToken) => (dispatch) => {
  fetch(apiUrl(`me`, '?'))
    .then(response => response.json())
    .then(me => {
      dispatch(setUser(me));
      dispatch(fetchGalleries());
    });
}
