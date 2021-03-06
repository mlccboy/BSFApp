import { Models } from '../dataStorage/models';
import { loadAsync } from '../dataStorage/storage';
import { getCurrentUser } from '../store/user';

// ------------------------------------
// Constants
// ------------------------------------
export const RECEIVE_PASSAGE = 'RECEIVE_PASSAGE';
export const CLEAR_PASSAGE = 'CLEAR_PASSAGE';

// ------------------------------------
// Actions
// ------------------------------------
// ------------------------------------
// Actions
// ------------------------------------
export function loadPassage(passageId) {
  return async (dispatch, getState) => {
    try {
      // Then make the http request for the class (a placeholder url below)
      // we use the await syntax.
      const state = getState();
      let passage;
      if (!state.passages[passageId]) {
        passage = await loadAsync(Models.Passage, passageId + "?bibleVersion=" + getCurrentUser().getBibleVersion(), true);
        if (passage) {
          dispatch({
            type: RECEIVE_PASSAGE,
            payload: { id: passageId, passage: passage },
          });
        }
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }
}

export function clearPassage() {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: CLEAR_PASSAGE,
        payload: {},
      });
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
}

const ACTION_HANDLERS = {
  [RECEIVE_PASSAGE]: (state, action) => Object.assign({}, state, { [action.payload.id]: action.payload.passage }),
  [CLEAR_PASSAGE]: (state, action) => { return {}; }
}

export default function passageReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
