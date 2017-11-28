import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_SUGGESTED = 'GET_SUGGESTED';
const REMOVE_SUGGESTED = 'REMOVE_SUGGESTED';

/**
 * INITIAL STATE
 */
const defaultSuggested = [];

/**
 * ACTION CREATORS
 */
const getSuggested = suggested => ({ type: GET_SUGGESTED, suggested });
export const removeSuggested = id => ({ type: REMOVE_SUGGESTED, id });

/**
 * THUNK CREATORS
 */
export const fetchSuggested = id => async dispatch => {
  console.log('fetchsuggested ran', id)
  try {
    const res = await axios.get(`/api/recs/${id}`);
    dispatch(getSuggested(res.data || defaultSuggested));
  }
  catch (err) { console.log('Fetching suggested unsuccessful', err); }
};

/**
 * REDUCER
 */
export default function (state = defaultSuggested, action) {
  switch (action.type) {
    case GET_SUGGESTED:
      return action.suggested;
    case REMOVE_SUGGESTED:
      return state.filter(sug => sug.id !== action.id);
    default:
      return state;
  }
}
