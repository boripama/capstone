import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_LIKES = 'GET_LIKES';

/**
 * INITIAL STATE
 */
const defaultLikes = {};

/**
 * ACTION CREATORS
 */
const getLikes = likes => ({ type: GET_LIKES, likes });

/**
 * THUNK CREATORS
 */
export const fetchLikes = (activityId) => async dispatch => {
  try {
    const res = await axios.get(`/api/activities/${activityId}/likes`);
    dispatch(getLikes(res.data || defaultLikes));
  }
  catch (err) { console.log('Fetching likes unsuccessful', err); }
};


/**
 * REDUCER
 */
export default function (state = defaultLikes, action) {
  switch (action.type) {
    case GET_LIKES:
      return action.likes;
    default:
      return state;
  }
}
