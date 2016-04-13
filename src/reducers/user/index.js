import * as actionTypes from 'constants/actionTypes'

const initialState = {
  galleries: []
}

export default function(state = initialState, action) {
  switch (action.type) {
  case actionTypes.MERGE_FOLLOWINGS:
    return mergeGalleries(state, action.galleries);
  case actionTypes.RESET_SESSION:
    return initialState;
  }
  return state;
}

function mergeFollowings(state, list) {
  return { ...state, galleries: concatList(state.galleries, list) };
}

function concatList(currentList, concatList) {
  return [...currentList, ...concatList];
}

function removeWithIndex(list, index) {
  return [
    ...list.slice(0, index),
    ...list.slice(index + 1)
  ];
}
