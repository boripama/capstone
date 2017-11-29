import axios from 'axios';

/**
 * ACTION TYPES
 */

const GET_LIKED_ACTIVITIES = 'GET_LIKED_ACTIVITIES';

/**
 * INITIAL STATE
 */
const defaultActivities = {};

/**
 * ACTION CREATORS
 */

const getLikedActivities = likedActivities => ({ type: GET_LIKED_ACTIVITIES, likedActivities });

/**
 * THUNK CREATORS
 */

export const fetchLikedActivities = id => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${id}/likes/`);
    dispatch(getLikedActivities(res.data || defaultActivities));
  }
  catch (err) { console.log('Fetching liked user activities unsucessful', err); }
}

/**
 * REDUCER
 */
export default function (state = defaultActivities, action) {
  switch (action.type) {
    case GET_LIKED_ACTIVITIES:
      return action.likedActivities;
    default:
      return state;
  }
}
