import * as actionTypes from 'constants/actionTypes'

const initialState = {
  session: null,
  user: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SESSION:
      return (state, session) => ({ ...state, session })
    case actionTypes.SET_USER:
      return (state, user) => ({ ...state, user })
    case actionTypes.RESET_SESSION:
      return initialState
  }
  return state
}

