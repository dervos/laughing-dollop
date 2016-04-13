const isDev = process.env.NODE_ENV === 'development'

export const REDIRECT_URI = isDev ?
  `${window.location.protocol}//${window.location.host}/callback` :
    'http://dummy.com:3000/callback'

export const CONSUMER_KEY = '4f74274670b22e1d2b0fd6af3a21a36e06246516'

export const OAUTH_TOKEN = 'accessToken'
