import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ACTIVITIES = 'GET_ACTIVITIES';

/**
 * INITIAL STATE
 */
const defaultActivities = {};

/**
 * ACTION CREATORS
 */
const getActivities = activities => ({ type: GET_ACTIVITIES, activities });

/**
 * THUNK CREATORS
 */
export const fetchActivities = () => async dispatch => {
  try {
    const res = await axios.get(`/api/activities/`);
    dispatch(getActivities(res.data || defaultActivities));
  }
  catch (err) { console.log('Fetching activities unsuccessful', err); }
};

/**
 * REDUCER
 */
export default function (state = defaultActivities, action) {
  switch (action.type) {
    case GET_ACTIVITIES:
      return action.activities;
    default:
      return state;
  }
}
